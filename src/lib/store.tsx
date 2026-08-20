import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

/* ----------------------------- Safe Storage Adapter ---------------------------- */

const memoryFallbackStore = new Map<string, string>();

function safeGetStorage(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    if (window.localStorage) {
      const val = window.localStorage.getItem(key);
      if (val !== null) return val;
    }
  } catch {}
  return memoryFallbackStore.get(key) ?? null;
}

function safeSetStorage(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    if (window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch {}
  memoryFallbackStore.set(key, value);
}

function safeRemoveStorage(key: string): void {
  if (typeof window === "undefined") return;
  try {
    if (window.localStorage) {
      window.localStorage.removeItem(key);
    }
  } catch {}
  memoryFallbackStore.delete(key);
}

/* ----------------------------- cart + wishlist ---------------------------- */

export interface CartLine {
  productId: string;
  slug: string;
  name: string;
  imageKey: string;
  price: number;
  quantity: number;
}

const CART_KEY = "idealab.cart.v1";
const WISH_KEY = "idealab.wishlist.v1";

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = safeGetStorage(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

interface StoreValue {
  hydrated: boolean;
  cart: CartLine[];
  cartCount: number;
  cartSubtotal: number;
  addToCart: (line: Omit<CartLine, "quantity">, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  wishlist: string[];
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    try {
      const stored = safeGetStorage("idealab.theme");
      if (stored === "light" || stored === "dark") return stored;
      if (
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        return "dark";
      }
    } catch {}
    return "light";
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.document?.documentElement) return;
    try {
      const root = window.document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      safeSetStorage("idealab.theme", theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    setCart(readJSON<CartLine[]>(CART_KEY, []));
    setWishlist(readJSON<string[]>(WISH_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      try {
        safeSetStorage(CART_KEY, JSON.stringify(cart));
      } catch {}
    }
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) {
      try {
        safeSetStorage(WISH_KEY, JSON.stringify(wishlist));
      } catch {}
    }
  }, [wishlist, hydrated]);

  const addToCart = useCallback((line: Omit<CartLine, "quantity">, quantity = 1) => {
    setCart((prev) => {
      const found = prev.find((l) => l.productId === line.productId);
      if (found) {
        return prev.map((l) =>
          l.productId === line.productId ? { ...l, quantity: l.quantity + quantity } : l,
        );
      }
      return [...prev, { ...line, quantity }];
    });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setCart((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.productId !== productId)
        : prev.map((l) => (l.productId === productId ? { ...l, quantity } : l)),
    );
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist],
  );

  const toggleWishlist = useCallback((productId: string) => {
    let added = false;
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      added = true;
      return [...prev, productId];
    });
    return added;
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart],
  );

  const cartSubtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart],
  );

  const value = useMemo<StoreValue>(
    () => ({
      hydrated,
      cart,
      cartCount,
      cartSubtotal,
      addToCart,
      setQuantity,
      removeFromCart,
      clearCart,
      wishlist,
      isWishlisted,
      toggleWishlist,
      removeFromWishlist,
      theme,
      toggleTheme,
    }),
    [
      hydrated,
      cart,
      cartCount,
      cartSubtotal,
      addToCart,
      setQuantity,
      removeFromCart,
      clearCart,
      wishlist,
      isWishlisted,
      toggleWishlist,
      removeFromWishlist,
      theme,
      toggleTheme,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return ctx;
}

/* --------------------------------- auth --------------------------------- */

interface AuthValue {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  displayName: string;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const isAdmin = useMemo(() => {
    if (!user) return false;
    const email = user.email?.toLowerCase() ?? "";
    return (
      email.includes("admin") ||
      email.endsWith("@aicte.gov.in") ||
      email === "admin@idealab.org" ||
      email === "klavanya0704@gmail.com"
    );
  }, [user]);

  const displayName = useMemo(() => {
    if (!user) return "";
    return (
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "User"
    );
  }, [user]);

  const value = useMemo<AuthValue>(
    () => ({
      session,
      user,
      loading,
      isAdmin,
      displayName,
      signOut,
    }),
    [session, user, loading, isAdmin, displayName, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
