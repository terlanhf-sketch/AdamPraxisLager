import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Search, Plus, Minus, LogOut, Settings, ArrowLeft, Download, X, Check,
  AlertTriangle, Package, Users, FolderPlus, Trash2, Pencil, Lock,
  ChevronRight, PackagePlus, Boxes, ShieldCheck, RefreshCw, Bell,
  Euro, Undo2, ShieldAlert, Eye, EyeOff, ScanLine, ArrowRight
} from "lucide-react";

const C = {
  bg: "#FFFFFF",
  panel: "#F2F8F4",
  panelBorder: "#DCE6DF",
  primary: "#1C6E4A",
  primaryHover: "#175C3D",
  mint: "#4FAE83",
  mintLight: "#E4F3EB",
  ink: "#16241D",
  sub: "#5C6B62",
  muted: "#8A9891",
  amber: "#C9821F",
  amberLight: "#FBF0DF",
  amberText: "#8A5A10",
  red: "#B23A3A",
  redLight: "#FBE7E7",
  redText: "#7C2727",
  line: "#E4E9E5",
};

const UNITS = ["Stück", "Karton", "Packung"];
const LOGO_SRC = "data:image/png;base64,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";

const KEYS = { cabinets: "dis_cabinets", boxes: "dis_boxes", products: "dis_products", users: "dis_users" };


function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function useStorage() {
  const get = useCallback(async (key) => {
    const r = await fetch(`/.netlify/functions/store?key=${encodeURIComponent(key)}`);
    if (!r.ok) throw new Error(`Laden fehlgeschlagen (${r.status})`);
    const data = await r.json();
    return data.value ? JSON.parse(data.value) : [];
  }, []);
  const set = useCallback(async (key, value) => {
    const r = await fetch(`/.netlify/functions/store?key=${encodeURIComponent(key)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: JSON.stringify(value) }),
    });
    if (!r.ok) throw new Error(`Speichern fehlgeschlagen (${r.status})`);
  }, []);
  return { get, set };
}

function statusOf(p) {
  if (p.quantity <= 0) return "critical";
  if (p.quantity <= p.minThreshold) return "low";
  return "ok";
}

function statusColors(status) {
  if (status === "critical") return { fg: C.red, bg: C.redLight, text: C.redText };
  if (status === "low") return { fg: C.red, bg: C.redLight, text: C.redText };
  return { fg: C.mint, bg: C.mintLight, text: C.primary };
}

function CabinetGlyph({ status = "ok", size = 48 }) {
  const s = statusColors(status);
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="4" width="36" height="40" rx="4" fill={C.panel} stroke={s.fg} strokeWidth="2" />
      <rect x="10" y="10" width="28" height="14" rx="2" fill="#fff" stroke={C.panelBorder} strokeWidth="1.5" />
      <rect x="10" y="27" width="28" height="14" rx="2" fill="#fff" stroke={C.panelBorder} strokeWidth="1.5" />
      <circle cx="24" cy="17" r="2" fill={s.fg} />
      <circle cx="24" cy="34" r="2" fill={s.fg} />
      <circle cx="38" cy="8" r="5" fill={s.fg} />
    </svg>
  );
}

function BoxGlyph({ status = "ok", size = 40 }) {
  const s = statusColors(status);
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="4" y="10" width="32" height="24" rx="3" fill="#fff" stroke={s.fg} strokeWidth="2" />
      <path d="M4 16h32" stroke={s.fg} strokeWidth="1.5" />
      <rect x="15" y="7" width="10" height="6" rx="1.5" fill={s.fg} />
    </svg>
  );
}

function Toast({ toasts, onDismiss }) {
  return (
    <div style={{ position: "fixed", top: 16, right: 16, zIndex: 200, display: "flex", flexDirection: "column", gap: 8, maxWidth: 320 }}>
      {toasts.map((t) => (
        <div
          key={t.id}
          onClick={() => onDismiss(t.id)}
          style={{
            background: t.kind === "error" ? C.redLight : t.kind === "warn" ? C.amberLight : C.mintLight,
            color: t.kind === "error" ? C.redText : t.kind === "warn" ? C.amberText : C.primary,
            border: `1px solid ${t.kind === "error" ? C.red : t.kind === "warn" ? C.amber : C.mint}`,
            borderRadius: 10, padding: "10px 14px", fontSize: 13, fontWeight: 500, cursor: "pointer",
            boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
          }}
        >
          {t.msg}
        </div>
      ))}
    </div>
  );
}

function PrimaryBtn({ children, onClick, style, disabled, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? C.muted : C.primary, color: "#fff", border: "none", borderRadius: 10,
        padding: "10px 16px", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center",
        gap: 6, cursor: disabled ? "not-allowed" : "pointer", fontFamily: "Inter, sans-serif", ...style,
      }}
    >
      {children}
    </button>
  );
}

function GhostBtn({ children, onClick, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#fff", color: C.primary, border: `1.5px solid ${C.panelBorder}`, borderRadius: 10,
        padding: "9px 14px", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center",
        gap: 6, cursor: "pointer", fontFamily: "Inter, sans-serif", ...style,
      }}
    >
      {children}
    </button>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: C.sub, fontWeight: 500 }}>
      {label}
      {children}
    </label>
  );
}

const inputStyle = {
  border: `1.5px solid ${C.panelBorder}`, borderRadius: 8, padding: "9px 10px", fontSize: 14,
  fontFamily: "Inter, sans-serif", color: C.ink, outline: "none", width: "100%", boxSizing: "border-box",
};

function Modal({ title, onClose, children, width = 440 }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(22,36,29,0.35)", zIndex: 150,
        display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 16, width: "100%", maxWidth: width, maxHeight: "88vh",
          overflowY: "auto", padding: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: 17, fontWeight: 600, color: C.ink }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.sub }}>
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const { get, set } = useStorage();
  const [loading, setLoading] = useState(true);
  const [cabinets, setCabinets] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({ id: "guest", name: "Mitarbeiter", role: "guest" });
  const [view, setView] = useState("dashboard");
  const [activeCabinetId, setActiveCabinetId] = useState(null);
  const [activeBoxId, setActiveBoxId] = useState(null);
  const [query, setQuery] = useState("");
  const [boxFilter, setBoxFilter] = useState("");
  const [toasts, setToasts] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showQuickScan, setShowQuickScan] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLowStock, setShowLowStock] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [autoDownload, setAutoDownload] = useState(false);
  const [loginName, setLoginName] = useState("");
  const [loginPin, setLoginPin] = useState("");
  const [loginPinConfirm, setLoginPinConfirm] = useState("");
  const [loginError, setLoginError] = useState("");
  const [lastAction, setLastAction] = useState(null); // { productId, delta, expiresAt }
  const [lastSynced, setLastSynced] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const notified = useRef(new Set());
  const jsPdfReady = useRef(false);
  const autoLowStockShown = useRef(false);
  const isAdmin = currentUser?.role === "admin";

  const pushToast = useCallback((msg, kind = "info") => {
    const id = uid();
    setToasts((t) => [...t, { id, msg, kind }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 5000);
  }, []);

  const lastErrorToastRef = useRef(0);
  const notifyCloudError = useCallback((msg) => {
    const now = Date.now();
    if (now - lastErrorToastRef.current > 15000) {
      lastErrorToastRef.current = now;
      pushToast(msg, "error");
    }
  }, [pushToast]);

  const loadAll = useCallback(async () => {
    setIsSyncing(true);
    try {
      const [c, b, p, u] = await Promise.all([get(KEYS.cabinets), get(KEYS.boxes), get(KEYS.products), get(KEYS.users)]);
      setCabinets(c || []);
      setBoxes(b || []);
      setProducts(p || []);
      setUsers(u || []);
      setLastSynced(Date.now());
      return { c: c || [], b: b || [], p: p || [], u: u || [] };
    } catch (err) {
      // Verbindung zur Cloud fehlgeschlagen — lokale Daten NICHT überschreiben
      notifyCloudError("Keine Verbindung zur Cloud — Änderungen werden lokal angezeigt, aber nicht synchronisiert.");
      return null;
    } finally {
      setLoading(false);
      setIsSyncing(false);
    }
  }, [get, notifyCloudError]);

  useEffect(() => {
    loadAll();
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Inter:wght@400;500;600&display=swap";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.onload = () => { jsPdfReady.current = true; };
    document.head.appendChild(script);
  }, [loadAll]);

  useEffect(() => {
    const iv = setInterval(() => { loadAll(); }, 2000);
    function onVisible() {
      if (document.visibilityState === "visible") loadAll();
    }
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);
    return () => {
      clearInterval(iv);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
    };
  }, [loadAll]);

  const saveToCloud = useCallback(async (key, value) => {
    try {
      await set(key, value);
    } catch (err) {
      notifyCloudError("Speichern fehlgeschlagen — bitte Internetverbindung prüfen. Änderung ist evtl. nicht auf anderen Geräten sichtbar.");
    }
  }, [set, notifyCloudError]);

  const lowStockList = useMemo(
    () => products.filter((p) => p.quantity <= p.minThreshold).sort((a, b) => a.quantity - b.quantity),
    [products]
  );

  const generatePDF = useCallback((list) => {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      pushToast("Die PDF-Bibliothek wird noch geladen, bitte versuchen Sie es gleich noch einmal.", "warn");
      return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(15);
    doc.text("Zahnarztpraxis — Knappe Produkte", 14, 16);
    doc.setFontSize(10);
    doc.text(new Date().toLocaleString("de-DE"), 14, 23);
    let y = 34;
    doc.setFontSize(11);
    doc.text("Produkt", 14, y);
    doc.text("Schrank / Fach", 90, y);
    doc.text("Menge", 150, y);
    doc.text("Status", 175, y);
    y += 4;
    doc.line(14, y, 196, y);
    y += 6;
    list.forEach((p) => {
      if (y > 280) { doc.addPage(); y = 20; }
      const cab = cabinets.find((c) => c.id === p.cabinetId);
      const box = boxes.find((b) => b.id === p.boxId);
      const st = statusOf(p);
      doc.setFontSize(10);
      doc.text(String(p.name).slice(0, 34), 14, y);
      doc.text(`${cab ? cab.name : "-"} / ${box ? box.name : "-"}`.slice(0, 28), 90, y);
      doc.text(`${p.quantity} ${p.unit}`, 150, y);
      doc.text(st === "critical" ? "Aufgebraucht" : "Knapp", 175, y);
      y += 7;
    });
    doc.save(`knappe-produkte-${new Date().toISOString().slice(0, 10)}.pdf`);
  }, [cabinets, boxes, pushToast]);

  // detect newly-crossed low-stock items for toast + optional auto pdf
  useEffect(() => {
    const currentIds = new Set(lowStockList.map((p) => p.id));
    const newlyLow = lowStockList.filter((p) => !notified.current.has(p.id));
    if (newlyLow.length > 0 && currentUser) {
      newlyLow.forEach((p) => pushToast(`"${p.name}" wird knapp (noch ${p.quantity} ${p.unit})`, "warn"));
      if (autoDownload) generatePDF(lowStockList);
    }
    // reset notified flag for items back above threshold
    notified.current = currentIds;
  }, [lowStockList, currentUser, autoDownload, generatePDF, pushToast]);

  // show a reminder automatically the first time the screen opens, if something is already low
  useEffect(() => {
    if (!loading && !autoLowStockShown.current) {
      autoLowStockShown.current = true;
      if (lowStockList.length > 0) {
        setShowLowStock(true);
      }
    }
  }, [loading, lowStockList]);

  // auto-clear the undo option a few seconds after a quantity change
  useEffect(() => {
    if (!lastAction) return;
    const t = setTimeout(() => setLastAction(null), 4000);
    return () => clearTimeout(t);
  }, [lastAction]);

  function decrementWithUndo(productId) {
    const p = products.find((x) => x.id === productId);
    if (!p || p.quantity <= 0) return;
    changeQty(productId, -1);
    setLastAction({ productId, delta: -1, ts: Date.now() });
  }

  function undoLastAction() {
    if (!lastAction) return;
    changeQty(lastAction.productId, -lastAction.delta);
    setLastAction(null);
  }

  useEffect(() => { setBoxFilter(""); }, [activeBoxId]);

  const totalValue = useMemo(() => products.reduce((sum, p) => sum + (Number(p.price) || 0) * p.quantity, 0), [products]);
  function cabinetValue(cabinetId) {
    return products.filter((p) => p.cabinetId === cabinetId).reduce((sum, p) => sum + (Number(p.price) || 0) * p.quantity, 0);
  }
  function boxValue(boxId) {
    return products.filter((p) => p.boxId === boxId).reduce((sum, p) => sum + (Number(p.price) || 0) * p.quantity, 0);
  }

  function adminLogin() {
    const u = users.find(
      (x) => x.role === "admin" && x.name.toLowerCase() === loginName.trim().toLowerCase() && x.pin === loginPin.trim()
    );
    if (!u) { setLoginError("Name oder PIN-Code ist falsch."); return; }
    setCurrentUser(u);
    setShowAdminLogin(false);
    setLoginName(""); setLoginPin(""); setLoginError("");
    pushToast(`Willkommen, ${u.name}.`);
  }

  async function createFirstAdmin(name, pin) {
    if (!name.trim() || pin.trim().length < 4) { setLoginError("Bitte Namen eingeben, PIN mindestens 4 Ziffern."); return; }
    const nu = { id: uid(), name: name.trim(), pin: pin.trim(), role: "admin" };
    const newUsers = [...users, nu];
    setUsers(newUsers);
    await saveToCloud(KEYS.users, newUsers);
    setCurrentUser(nu);
    setShowAdminLogin(false);
    setLoginName(""); setLoginPin(""); setLoginError("");
    pushToast(`Admin-Konto für ${nu.name} wurde erstellt.`);
  }

  function logout() {
    setCurrentUser({ id: "guest", name: "Mitarbeiter", role: "guest" });
    setLoginName(""); setLoginPin(""); setLoginError("");
  }

  async function addCabinet(name, boxCount) {
    const cab = { id: uid(), name, createdAt: Date.now() };
    const newCabinets = [...cabinets, cab];
    const newBoxes = [...boxes];
    for (let i = 1; i <= boxCount; i++) newBoxes.push({ id: uid(), cabinetId: cab.id, name: `Fach ${i}` });
    setCabinets(newCabinets); setBoxes(newBoxes);
    await saveToCloud(KEYS.cabinets, newCabinets); await saveToCloud(KEYS.boxes, newBoxes);
    pushToast(`"${name}" Schrank wurde erstellt.`);
  }

  async function addBox(cabinetId, name) {
    const nb = { id: uid(), cabinetId, name };
    const newBoxes = [...boxes, nb];
    setBoxes(newBoxes); await saveToCloud(KEYS.boxes, newBoxes);
  }

  async function deleteCabinet(cabinetId) {
    const hasProducts = products.some((p) => p.cabinetId === cabinetId);
    if (hasProducts) { pushToast("Dieser Schrank enthält noch Produkte. Löschen Sie diese zuerst.", "error"); return; }
    const newCabinets = cabinets.filter((c) => c.id !== cabinetId);
    const newBoxes = boxes.filter((b) => b.cabinetId !== cabinetId);
    setCabinets(newCabinets); setBoxes(newBoxes);
    await saveToCloud(KEYS.cabinets, newCabinets); await saveToCloud(KEYS.boxes, newBoxes);
  }

  async function deleteBox(boxId) {
    const hasProducts = products.some((p) => p.boxId === boxId);
    if (hasProducts) { pushToast("Dieses Fach enthält noch Produkte. Löschen Sie diese zuerst.", "error"); return; }
    const newBoxes = boxes.filter((b) => b.id !== boxId);
    setBoxes(newBoxes); await saveToCloud(KEYS.boxes, newBoxes);
  }

  async function addUser(name, pin, role) {
    if (!name.trim() || pin.trim().length < 4) { pushToast("Bitte Namen eingeben, PIN mindestens 4 Ziffern.", "error"); return; }
    const nu = { id: uid(), name: name.trim(), pin: pin.trim(), role };
    const newUsers = [...users, nu];
    setUsers(newUsers); await saveToCloud(KEYS.users, newUsers);
    pushToast(`Zugang für ${name} wurde erstellt.`);
  }

  async function deleteUser(userId) {
    const newUsers = users.filter((u) => u.id !== userId);
    setUsers(newUsers); await saveToCloud(KEYS.users, newUsers);
  }

  async function editUser(userId, name, pin) {
    if (!name.trim() || pin.trim().length < 4) { pushToast("Bitte Namen eingeben, PIN mindestens 4 Ziffern.", "error"); return; }
    const newUsers = users.map((u) => (u.id === userId ? { ...u, name: name.trim(), pin: pin.trim() } : u));
    setUsers(newUsers);
    await saveToCloud(KEYS.users, newUsers);
    if (currentUser.id === userId) setCurrentUser((cu) => ({ ...cu, name: name.trim(), pin: pin.trim() }));
    pushToast("Zugang wurde aktualisiert.");
  }

  async function saveProduct(data) {
    let newProducts;
    if (data.id) {
      newProducts = products.map((p) => (p.id === data.id ? { ...p, ...data, updatedAt: Date.now() } : p));
    } else {
      const existing =
        (data.barcode && data.barcode.trim() && products.find((p) => p.barcode && p.barcode.trim() === data.barcode.trim())) ||
        products.find(
          (p) => p.boxId === data.boxId && p.name.trim().toLowerCase() === data.name.trim().toLowerCase()
        );
      if (existing) {
        newProducts = products.map((p) =>
          p.id === existing.id ? { ...p, quantity: p.quantity + Number(data.quantity), updatedAt: Date.now() } : p
        );
        pushToast(`Bestand von "${existing.name}" wurde erhöht.`);
      } else {
        newProducts = [...products, { id: uid(), usageCount: 0, updatedAt: Date.now(), ...data }];
        pushToast(`"${data.name}" wurde hinzugefügt.`);
      }
    }
    setProducts(newProducts);
    await saveToCloud(KEYS.products, newProducts);
  }

  async function changeQty(productId, delta) {
    let updated = null;
    const newProducts = products.map((p) => {
      if (p.id !== productId) return p;
      const q = Math.max(0, p.quantity + delta);
      updated = { ...p, quantity: q, usageCount: delta < 0 ? p.usageCount + 1 : p.usageCount, updatedAt: Date.now() };
      return updated;
    });
    setProducts(newProducts);
    await saveToCloud(KEYS.products, newProducts);
  }

  async function deleteProduct(productId) {
    const newProducts = products.filter((p) => p.id !== productId);
    setProducts(newProducts); await saveToCloud(KEYS.products, newProducts);
  }

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return products
      .filter((p) => p.name.toLowerCase().includes(q))
      .slice(0, 8)
      .map((p) => ({ p, cab: cabinets.find((c) => c.id === p.cabinetId), box: boxes.find((b) => b.id === p.boxId) }));
  }, [query, products, cabinets, boxes]);

  function goToProduct(p) {
    setActiveCabinetId(p.cabinetId);
    setActiveBoxId(p.boxId);
    setView("box");
    setQuery("");
  }

  const activeCabinet = cabinets.find((c) => c.id === activeCabinetId);
  const activeBox = boxes.find((b) => b.id === activeBoxId);
  const cabinetBoxes = boxes.filter((b) => b.cabinetId === activeCabinetId);
  const boxProducts = products.filter((p) => p.boxId === activeBoxId).sort((a, b) => b.usageCount - a.usageCount);

  function cabinetStatus(cabinetId) {
    const items = products.filter((p) => p.cabinetId === cabinetId);
    if (items.some((p) => statusOf(p) === "critical")) return "critical";
    if (items.some((p) => statusOf(p) === "low")) return "low";
    return "ok";
  }
  function boxStatus(boxId) {
    const items = products.filter((p) => p.boxId === boxId);
    if (items.some((p) => statusOf(p) === "critical")) return "critical";
    if (items.some((p) => statusOf(p) === "low")) return "low";
    return "ok";
  }

  const pageStyle = { fontFamily: "Inter, sans-serif", background: C.bg, minHeight: "100vh", color: C.ink };

  if (loading) {
    return (
      <div style={{ ...pageStyle, display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <RefreshCw size={22} color={C.primary} className="spin" />
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <Toast toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />

      {/* Sync-Status: fixe Position, damit er nie springt oder die Suche verschiebt */}
      <div
        title={lastSynced ? `Zuletzt synchronisiert: ${new Date(lastSynced).toLocaleTimeString("de-DE")}` : "Synchronisiere..."}
        style={{
          position: "fixed", left: 10, bottom: 10, zIndex: 30,
          display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: C.muted,
          background: "#fff", border: `1px solid ${C.panelBorder}`, borderRadius: 999, padding: "4px 8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)", pointerEvents: "none", opacity: 0.85,
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: isSyncing ? C.amber : C.mint, transition: "background 0.2s", flexShrink: 0 }} />
        Live
      </div>

      {/* Top bar */}
      <div style={{ borderBottom: `1px solid ${C.line}`, position: "sticky", top: 0, background: "#fff", zIndex: 40 }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "12px 16px", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <div
            onClick={() => { setView("dashboard"); setActiveCabinetId(null); setActiveBoxId(null); }}
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0 }}
          >
            <img src={LOGO_SRC} alt="Zahnärzte Adam" style={{ height: 34, width: "auto", display: "block" }} />
            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: C.sub, fontSize: 12, borderLeft: `1.5px solid ${C.panelBorder}`, paddingLeft: 10, lineHeight: 1.2 }}>
              Lager<br />verwaltung
            </span>
          </div>

          <div style={{ position: "relative", flex: "1 1 200px", minWidth: 160 }}>
            <Search size={16} color={C.muted} style={{ position: "absolute", left: 10, top: 10 }} />
            <input
              style={{ ...inputStyle, paddingLeft: 32 }} placeholder="Produkt suchen..."
              value={query} onChange={(e) => setQuery(e.target.value)}
            />
            {searchResults.length > 0 && (
              <div style={{ position: "absolute", top: 42, left: 0, right: 0, background: "#fff", border: `1px solid ${C.panelBorder}`, borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 60, overflow: "hidden" }}>
                {searchResults.map(({ p, cab, box }) => {
                  const s = statusColors(statusOf(p));
                  return (
                    <div
                      key={p.id} onClick={() => goToProduct(p)}
                      style={{ padding: "10px 12px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.line}` }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = C.panel)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                    >
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: C.sub }}>{cab?.name} / {box?.name}</div>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 600, color: s.text, background: s.bg, padding: "3px 8px", borderRadius: 8 }}>
                        {p.quantity} {p.unit}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <button
            onClick={() => setShowLowStock(true)}
            style={{ position: "relative", background: lowStockList.length ? C.redLight : "#fff", border: `1.5px solid ${lowStockList.length ? C.red : C.panelBorder}`, borderRadius: 10, padding: 9, cursor: "pointer", color: lowStockList.length ? C.redText : C.sub }}
            aria-label="Knappe Produkte"
          >
            <Bell size={17} />
            {lowStockList.length > 0 && (
              <span style={{ position: "absolute", top: -6, right: -6, background: C.red, color: "#fff", borderRadius: 10, fontSize: 10, fontWeight: 700, minWidth: 17, height: 17, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {lowStockList.length}
              </span>
            )}
          </button>

          {isAdmin && (
            <>
              <GhostBtn onClick={() => setShowQuickScan(true)}><ScanLine size={16} /> Wareneingang</GhostBtn>
              <GhostBtn onClick={() => setShowAdd(true)}><PackagePlus size={16} /> Neues Produkt</GhostBtn>
              <GhostBtn onClick={() => setShowAdmin(true)}><Settings size={16} /> Admin</GhostBtn>
            </>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.sub }}>
            {isAdmin ? (
              <>
                <span style={{ display: "flex", alignItems: "center", gap: 5, color: C.primary, fontWeight: 600 }}>
                  <ShieldCheck size={15} /> {currentUser.name}
                </span>
                <button onClick={logout} style={{ background: "none", border: "none", cursor: "pointer", color: C.sub }} aria-label="Abmelden">
                  <LogOut size={17} />
                </button>
              </>
            ) : (
              <GhostBtn onClick={() => setShowAdminLogin(true)}><Lock size={15} /> Admin</GhostBtn>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "20px 16px 60px" }}>
        {/* DASHBOARD */}
        {view === "dashboard" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 18, fontWeight: 600, margin: 0 }}>Schränke</h2>
              {cabinets.length === 0 && currentUser.role === "admin" && (
                <GhostBtn onClick={() => setShowAdmin(true)}><FolderPlus size={15} /> Schrank erstellen</GhostBtn>
              )}
            </div>
            {cabinets.length === 0 ? (
              <div style={{ textAlign: "center", padding: 60, color: C.sub, border: `1.5px dashed ${C.panelBorder}`, borderRadius: 16 }}>
                <Boxes size={30} style={{ marginBottom: 10, color: C.muted }} />
                <p>Es wurde noch kein Schrank erstellt. {currentUser.role === "admin" ? "Beginnen Sie im Admin-Bereich." : "Wenden Sie sich an den Admin."}</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 14 }}>
                {cabinets.map((cab) => {
                  const st = cabinetStatus(cab.id);
                  const count = products.filter((p) => p.cabinetId === cab.id).length;
                  return (
                    <div
                      key={cab.id} onClick={() => { setActiveCabinetId(cab.id); setView("cabinet"); }}
                      style={{ background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 14, padding: 16, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center" }}
                    >
                      <CabinetGlyph status={st} size={48} />
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{cab.name}</div>
                      <div style={{ fontSize: 12, color: C.sub }}>{count} Produkte</div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* CABINET VIEW */}
        {view === "cabinet" && activeCabinet && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <button onClick={() => setView("dashboard")} style={{ background: "none", border: "none", cursor: "pointer", color: C.primary }}><ArrowLeft size={20} /></button>
              <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 18, fontWeight: 600, margin: 0 }}>{activeCabinet.name}</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12 }}>
              {cabinetBoxes.map((box) => {
                const items = products.filter((p) => p.boxId === box.id).sort((a, b) => b.usageCount - a.usageCount);
                const top = items.slice(0, 2);
                const st = boxStatus(box.id);
                return (
                  <div
                    key={box.id} onClick={() => { setActiveBoxId(box.id); setView("box"); }}
                    style={{ background: "#fff", border: `1px solid ${C.panelBorder}`, borderRadius: 14, padding: 14, cursor: "pointer", display: "flex", flexDirection: "column", gap: 6 }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <BoxGlyph status={st} size={30} />
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{box.name}</span>
                    </div>
                    <div style={{ fontSize: 11.5, color: C.sub, minHeight: 30 }}>
                      {top.length > 0 ? top.map((p) => p.name).join(", ") : "Leer"}
                    </div>
                    <div style={{ fontSize: 11, color: C.muted }}>{items.length} Produkte</div>
                  </div>
                );
              })}
              {cabinetBoxes.length === 0 && (
                <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 40, color: C.sub, border: `1.5px dashed ${C.panelBorder}`, borderRadius: 14 }}>
                  In diesem Schrank gibt es noch keine Fächer. Fügen Sie sie im Admin-Bereich hinzu.
                </div>
              )}
            </div>
          </>
        )}

        {/* BOX DETAIL */}
        {view === "box" && activeBox && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <button onClick={() => setView("cabinet")} style={{ background: "none", border: "none", cursor: "pointer", color: C.primary }}><ArrowLeft size={20} /></button>
              <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 18, fontWeight: 600, margin: 0 }}>
                {activeCabinet?.name} / {activeBox.name}
              </h2>
            </div>
            <div style={{ position: "relative", marginBottom: 12, maxWidth: 220 }}>
              <input
                style={inputStyle} placeholder="Anfangsbuchstabe eingeben..."
                value={boxFilter} onChange={(e) => setBoxFilter(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {boxProducts
                .filter((p) => !boxFilter.trim() || p.name.toLowerCase().startsWith(boxFilter.trim().toLowerCase()) || p.name.toLowerCase().includes(boxFilter.trim().toLowerCase()))
                .map((p) => {
                const s = statusColors(statusOf(p));
                const isUndoTarget = lastAction && lastAction.productId === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => decrementWithUndo(p.id)}
                    title="Klicken, um 1 Einheit abzuziehen"
                    style={{
                      background: s.bg, border: `1.5px solid ${s.fg}`, borderRadius: 999, padding: "10px 18px",
                      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", cursor: "pointer",
                    }}
                  >
                    <div style={{ minWidth: 120 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: C.ink }}>{p.name}</div>
                      <div style={{ fontSize: 11.5, color: C.sub }}>Mindestbestand: {p.minThreshold} {p.unit}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }} onClick={(e) => e.stopPropagation()}>
                      {isUndoTarget && (
                        <button
                          onClick={undoLastAction}
                          style={{ display: "flex", alignItems: "center", gap: 4, background: "#fff", border: `1.5px solid ${C.panelBorder}`, borderRadius: 999, padding: "5px 10px", fontSize: 11.5, fontWeight: 600, color: C.primary, cursor: "pointer" }}
                        >
                          <Undo2 size={13} /> Rückgängig
                        </button>
                      )}
                      <span style={{ fontSize: 13, fontWeight: 700, color: s.text, background: "#fff", padding: "5px 12px", borderRadius: 999, border: `1px solid ${s.fg}` }}>
                        {p.quantity} {p.unit}
                      </span>
                      {isAdmin && (
                        <>
                          <button onClick={() => changeQty(p.id, 1)} style={{ background: "#fff", border: `1px solid ${C.panelBorder}`, borderRadius: "50%", width: 28, height: 28, cursor: "pointer", color: C.primary, display: "flex", alignItems: "center", justifyContent: "center" }}><Plus size={13} /></button>
                          <button onClick={() => setEditProduct(p)} style={{ background: "none", border: "none", cursor: "pointer", color: C.sub }}><Pencil size={15} /></button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
              {boxProducts.length === 0 && (
                <div style={{ textAlign: "center", padding: 40, color: C.sub, border: `1.5px dashed ${C.panelBorder}`, borderRadius: 14 }}>
                  In diesem Fach gibt es noch keine Produkte.
                </div>
              )}
              {isAdmin && (
                <GhostBtn onClick={() => setShowAdd(true)} style={{ alignSelf: "flex-start", marginTop: 4 }}>
                  <Plus size={15} /> Produkt zu diesem Fach hinzufügen
                </GhostBtn>
              )}
            </div>
          </>
        )}
      </div>

      {showAdd && (
        <QuickAddModal
          cabinets={cabinets} boxes={boxes} products={products}
          defaultCabinetId={activeCabinetId} defaultBoxId={view === "box" ? activeBoxId : null}
          onClose={() => setShowAdd(false)}
          onSave={async (data) => { await saveProduct(data); setShowAdd(false); }}
        />
      )}

      {showQuickScan && isAdmin && (
        <QuickScanModal
          cabinets={cabinets} boxes={boxes} products={products}
          onIncrement={changeQty}
          onCreate={saveProduct}
          onClose={() => setShowQuickScan(false)}
        />
      )}

      {editProduct && (
        <EditProductModal
          product={editProduct} onClose={() => setEditProduct(null)}
          onSave={async (data) => { await saveProduct(data); setEditProduct(null); }}
          onDelete={async () => { await deleteProduct(editProduct.id); setEditProduct(null); }}
        />
      )}

      {showAdmin && isAdmin && (
        <AdminModal
          cabinets={cabinets} boxes={boxes} users={users} products={products}
          lowStockList={lowStockList}
          onClose={() => setShowAdmin(false)}
          onAddCabinet={addCabinet} onAddBox={addBox}
          onDeleteCabinet={deleteCabinet} onDeleteBox={deleteBox}
          onAddUser={addUser} onDeleteUser={deleteUser} onEditUser={editUser}
          onDownloadPDF={() => generatePDF(lowStockList)}
          currentUser={currentUser}
          totalValue={totalValue} cabinetValue={cabinetValue} boxValue={boxValue}
        />
      )}

      {showLowStock && (
        <LowStockModal
          list={lowStockList} cabinets={cabinets} boxes={boxes}
          onClose={() => setShowLowStock(false)}
          onDownload={() => generatePDF(lowStockList)}
          autoDownload={autoDownload} setAutoDownload={setAutoDownload}
        />
      )}

      {showAdminLogin && (
        <Modal
          title={users.length === 0 ? "Ersten Admin-Zugang erstellen" : "Admin-Anmeldung"}
          onClose={() => { setShowAdminLogin(false); setLoginError(""); setLoginName(""); setLoginPin(""); setLoginPinConfirm(""); }}
          width={360}
        >
          {users.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ fontSize: 12.5, color: C.sub, marginTop: -4 }}>
                Es gibt noch keinen Admin-Zugang. Legen Sie hier den ersten fest — Name und PIN können später im Admin-Bereich geändert werden.
              </p>
              <Field label="Ihr Name">
                <input style={inputStyle} value={loginName} onChange={(e) => setLoginName(e.target.value)} placeholder="Namen eingeben" autoFocus />
              </Field>
              <Field label="Neuer PIN (mind. 4 Ziffern)">
                <input style={inputStyle} type="password" inputMode="numeric" value={loginPin} onChange={(e) => setLoginPin(e.target.value)} placeholder="••••" />
              </Field>
              <Field label="PIN bestätigen">
                <input
                  style={inputStyle} type="password" inputMode="numeric" value={loginPinConfirm}
                  onChange={(e) => setLoginPinConfirm(e.target.value)}
                  placeholder="••••"
                  onKeyDown={(e) => e.key === "Enter" && (loginPin === loginPinConfirm ? createFirstAdmin(loginName, loginPin) : setLoginError("Die PINs stimmen nicht überein."))}
                />
              </Field>
              {loginError && <div style={{ color: C.redText, fontSize: 12 }}>{loginError}</div>}
              <PrimaryBtn
                onClick={() => (loginPin === loginPinConfirm ? createFirstAdmin(loginName, loginPin) : setLoginError("Die PINs stimmen nicht überein."))}
                style={{ justifyContent: "center" }}
              >
                <ShieldCheck size={15} /> Admin-Zugang erstellen
              </PrimaryBtn>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Field label="Admin-Name">
                <input style={inputStyle} value={loginName} onChange={(e) => setLoginName(e.target.value)} placeholder="Namen eingeben" autoFocus />
              </Field>
              <Field label="PIN-Code">
                <input
                  style={inputStyle} type="password" inputMode="numeric" value={loginPin}
                  onChange={(e) => setLoginPin(e.target.value)} placeholder="••••"
                  onKeyDown={(e) => e.key === "Enter" && adminLogin()}
                />
              </Field>
              {loginError && <div style={{ color: C.redText, fontSize: 12 }}>{loginError}</div>}
              <PrimaryBtn onClick={adminLogin} style={{ justifyContent: "center" }}>
                <Lock size={15} /> Anmelden
              </PrimaryBtn>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

function QuickScanModal({ cabinets, boxes, products, onIncrement, onCreate, onClose }) {
  const [cabinetId, setCabinetId] = useState(cabinets[0]?.id || "");
  const availableBoxes = boxes.filter((b) => b.cabinetId === cabinetId);
  const [boxId, setBoxId] = useState(availableBoxes[0]?.id || "");
  const [amount, setAmount] = useState(1);
  const [input, setInput] = useState("");
  const [log, setLog] = useState([]); // { id, name, qty, type: "increment" | "new", ts }
  const [draft, setDraft] = useState(null); // { name, barcode, unit, minThreshold, price } when no match found
  const [pendingMatch, setPendingMatch] = useState(null); // matched product waiting for Menge-Bestätigung
  const inputRef = useRef(null);
  const amountRef = useRef(null);

  useEffect(() => {
    if (!availableBoxes.some((b) => b.id === boxId)) setBoxId(availableBoxes[0]?.id || "");
  }, [cabinetId]); // eslint-disable-line

  useEffect(() => {
    const t = setTimeout(() => {
      if (pendingMatch) {
        amountRef.current?.focus();
        amountRef.current?.select();
      } else {
        inputRef.current?.focus();
      }
    }, 80);
    return () => clearTimeout(t);
  }, [draft, pendingMatch]);

  function refocus() {
    setTimeout(() => inputRef.current?.focus(), 30);
  }

  function handleScan() {
    const q = input.trim();
    if (!q) return;
    const byBarcode = products.find((p) => p.barcode && p.barcode.trim().toLowerCase() === q.toLowerCase());
    const byName = byBarcode || products.find((p) => p.name.trim().toLowerCase() === q.toLowerCase());
    const match = byBarcode || byName;
    if (match) {
      // Artikel gefunden — Fokus springt zur Menge, Bestand wird erst nach Enter im Menge-Feld gebucht
      setPendingMatch(match);
      setAmount(1);
    } else {
      const looksLikeBarcode = /^[0-9A-Za-z\-]{6,}$/.test(q);
      setDraft({
        name: looksLikeBarcode ? "" : q,
        barcode: looksLikeBarcode ? q : "",
        unit: UNITS[0],
        minThreshold: 2,
        price: "",
      });
    }
  }

  function confirmPendingQty() {
    if (!pendingMatch) return;
    const qty = Number(amount) || 1;
    onIncrement(pendingMatch.id, qty);
    setLog((l) => [{ id: uid(), name: pendingMatch.name, qty, type: "increment", ts: Date.now() }, ...l].slice(0, 30));
    setPendingMatch(null);
    setInput("");
    setAmount(1);
  }

  function cancelPendingMatch() {
    setPendingMatch(null);
    setInput("");
    setAmount(1);
  }

  function saveDraft() {
    if (!draft.name.trim() || !cabinetId || !boxId) return;
    const qty = Number(amount) || 1;
    onCreate({
      name: draft.name.trim(),
      barcode: draft.barcode.trim(),
      cabinetId, boxId, unit: draft.unit,
      quantity: qty, minThreshold: Number(draft.minThreshold) || 0,
      price: draft.price === "" ? 0 : Number(draft.price),
    });
    setLog((l) => [{ id: uid(), name: draft.name.trim(), qty, type: "new", ts: Date.now() }, ...l].slice(0, 30));
    setDraft(null);
    setInput("");
    refocus();
  }

  return (
    <Modal title="Wareneingang — Schnellerfassung" onClose={onClose} width={480}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <p style={{ fontSize: 12, color: C.sub, margin: 0 }}>
          Barcode scannen oder Produktnamen eingeben und Enter drücken. Bei bekannten Produkten springt der Fokus direkt zur Menge — Zahl eingeben und wieder Enter drücken, um zu buchen. Unbekannte Artikel können direkt neu angelegt werden. Danach springt der Fokus automatisch zurück, sodass mehrere Artikel schnell hintereinander erfasst werden können.
        </p>

        <div style={{ display: "flex", gap: 8 }}>
          <Field label="Ziel-Schrank">
            <select style={inputStyle} value={cabinetId} onChange={(e) => setCabinetId(e.target.value)}>
              {cabinets.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </Field>
          <Field label="Ziel-Fach">
            <select style={inputStyle} value={boxId} onChange={(e) => setBoxId(e.target.value)}>
              {availableBoxes.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </Field>
          <Field label="Menge/Scan">
            <input
              ref={amountRef} style={{ ...inputStyle, width: 64, ...(pendingMatch ? { borderColor: C.mint, background: C.mintLight } : {}) }}
              type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)}
              onFocus={(e) => e.target.select()}
              onKeyDown={(e) => {
                if (e.key === "Enter") confirmPendingQty();
                if (e.key === "Escape") cancelPendingMatch();
              }}
            />
          </Field>
        </div>

        {pendingMatch ? (
          <div style={{ background: C.mintLight, border: `1px solid ${C.mint}`, borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
              <ArrowRight size={14} color={C.mint} />
              <strong>{pendingMatch.name}</strong>
              <span style={{ color: C.sub }}>— aktuell {pendingMatch.quantity} {pendingMatch.unit}</span>
            </span>
            <button onClick={cancelPendingMatch} style={{ background: "none", border: "none", cursor: "pointer", color: C.sub, fontSize: 12 }}>Abbrechen (Esc)</button>
          </div>
        ) : !draft ? (
          <Field label="Barcode oder Produktname">
            <input
              ref={inputRef} style={inputStyle} value={input} autoFocus
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleScan()}
              placeholder="Scannen oder tippen und Enter…"
            />
          </Field>
        ) : (
          <div style={{ background: C.panel, borderRadius: 12, padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 12.5, color: C.sub, display: "flex", alignItems: "center", gap: 6 }}>
              <AlertTriangle size={14} color={C.amber} /> Kein Treffer für "{input}" — neues Produkt anlegen:
            </div>
            <Field label="Produktname">
              <input style={inputStyle} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} autoFocus placeholder="Produktname" />
            </Field>
            <Field label="Barcode (optional)">
              <input style={inputStyle} value={draft.barcode} onChange={(e) => setDraft({ ...draft, barcode: e.target.value })} />
            </Field>
            <div style={{ display: "flex", gap: 10 }}>
              <Field label="Einheit">
                <select style={inputStyle} value={draft.unit} onChange={(e) => setDraft({ ...draft, unit: e.target.value })}>
                  {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </Field>
              <Field label="Mindestbestand">
                <input style={inputStyle} type="number" min="0" value={draft.minThreshold} onChange={(e) => setDraft({ ...draft, minThreshold: e.target.value })} />
              </Field>
              <Field label="Preis (€)">
                <input style={inputStyle} type="number" min="0" step="0.01" value={draft.price} onChange={(e) => setDraft({ ...draft, price: e.target.value })} placeholder="0.00" />
              </Field>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <PrimaryBtn onClick={saveDraft} style={{ flex: 1, justifyContent: "center" }}><Check size={15} /> Anlegen & weiter</PrimaryBtn>
              <GhostBtn onClick={() => { setDraft(null); setInput(""); refocus(); }} style={{ flex: 1, justifyContent: "center" }}>Abbrechen</GhostBtn>
            </div>
          </div>
        )}

        {log.length > 0 && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.sub, marginBottom: 6 }}>Zuletzt erfasst</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 220, overflowY: "auto" }}>
              {log.map((l) => (
                <div key={l.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: l.type === "new" ? C.mintLight : C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 8, padding: "6px 10px", fontSize: 12.5 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {l.type === "new" ? <PackagePlus size={13} color={C.primary} /> : <ArrowRight size={13} color={C.mint} />}
                    {l.name}
                  </span>
                  <span style={{ fontWeight: 700, color: C.primary }}>+{l.qty}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

function QuickAddModal({ cabinets, boxes, products, defaultCabinetId, defaultBoxId, onClose, onSave }) {
  const [cabinetId, setCabinetId] = useState(defaultCabinetId || (cabinets[0]?.id ?? ""));
  const [boxId, setBoxId] = useState(defaultBoxId || "");
  const [name, setName] = useState("");
  const [unit, setUnit] = useState(UNITS[0]);
  const [quantity, setQuantity] = useState(1);
  const [minThreshold, setMinThreshold] = useState(2);
  const [price, setPrice] = useState("");
  const [barcode, setBarcode] = useState("");

  const availableBoxes = boxes.filter((b) => b.cabinetId === cabinetId);
  useEffect(() => {
    if (!availableBoxes.some((b) => b.id === boxId)) setBoxId(availableBoxes[0]?.id || "");
  }, [cabinetId]); // eslint-disable-line

  function submit() {
    if (!name.trim() || !cabinetId || !boxId) return;
    onSave({ name: name.trim(), cabinetId, boxId, unit, quantity: Number(quantity), minThreshold: Number(minThreshold), price: price === "" ? 0 : Number(price), barcode: barcode.trim() });
  }

  return (
    <Modal title="Neues Produkt hinzufügen" onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Field label="Produktname">
          <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="z. B. Nitrilhandschuhe M" autoFocus />
        </Field>
        <Field label="Barcode (optional)">
          <input style={inputStyle} value={barcode} onChange={(e) => setBarcode(e.target.value)} placeholder="Barcode scannen oder eingeben" />
        </Field>
        <div style={{ display: "flex", gap: 10 }}>
          <Field label="Schrank">
            <select style={inputStyle} value={cabinetId} onChange={(e) => setCabinetId(e.target.value)}>
              {cabinets.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </Field>
          <Field label="Fach">
            <select style={inputStyle} value={boxId} onChange={(e) => setBoxId(e.target.value)}>
              {availableBoxes.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </Field>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Field label="Einheit">
            <select style={inputStyle} value={unit} onChange={(e) => setUnit(e.target.value)}>
              {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </Field>
          <Field label="Menge">
            <input style={inputStyle} type="number" min="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </Field>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Field label="Mindestbestand (Warnung darunter)">
            <input style={inputStyle} type="number" min="0" value={minThreshold} onChange={(e) => setMinThreshold(e.target.value)} />
          </Field>
          <Field label="Preis pro Einheit (€, optional)">
            <input style={inputStyle} type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" />
          </Field>
        </div>
        <PrimaryBtn onClick={submit} style={{ justifyContent: "center" }}><Check size={15} /> Speichern</PrimaryBtn>
      </div>
    </Modal>
  );
}

function EditProductModal({ product, onClose, onSave, onDelete }) {
  const [name, setName] = useState(product.name);
  const [unit, setUnit] = useState(product.unit);
  const [quantity, setQuantity] = useState(product.quantity);
  const [minThreshold, setMinThreshold] = useState(product.minThreshold);
  const [price, setPrice] = useState(product.price ?? "");
  const [barcode, setBarcode] = useState(product.barcode ?? "");
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <Modal title="Produkt bearbeiten" onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Field label="Produktname">
          <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label="Barcode (optional)">
          <input style={inputStyle} value={barcode} onChange={(e) => setBarcode(e.target.value)} placeholder="Barcode scannen oder eingeben" />
        </Field>
        <div style={{ display: "flex", gap: 10 }}>
          <Field label="Einheit">
            <select style={inputStyle} value={unit} onChange={(e) => setUnit(e.target.value)}>
              {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </Field>
          <Field label="Menge">
            <input style={inputStyle} type="number" min="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </Field>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Field label="Mindestbestand">
            <input style={inputStyle} type="number" min="0" value={minThreshold} onChange={(e) => setMinThreshold(e.target.value)} />
          </Field>
          <Field label="Preis pro Einheit (€, optional)">
            <input style={inputStyle} type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" />
          </Field>
        </div>
        <PrimaryBtn
          onClick={() => onSave({ id: product.id, name: name.trim(), unit, quantity: Number(quantity), minThreshold: Number(minThreshold), price: price === "" ? 0 : Number(price), barcode: barcode.trim(), cabinetId: product.cabinetId, boxId: product.boxId })}
          style={{ justifyContent: "center" }}
        >
          <Check size={15} /> Speichern
        </PrimaryBtn>
        {!confirmDelete ? (
          <button onClick={() => setConfirmDelete(true)} style={{ background: "none", border: "none", color: C.redText, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
            <Trash2 size={14} /> Produkt löschen
          </button>
        ) : (
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            <span style={{ fontSize: 12, color: C.redText, alignSelf: "center" }}>Sind Sie sicher?</span>
            <button onClick={onDelete} style={{ background: C.red, color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, cursor: "pointer" }}>Ja, löschen</button>
            <button onClick={() => setConfirmDelete(false)} style={{ background: "none", border: `1px solid ${C.panelBorder}`, borderRadius: 8, padding: "6px 12px", fontSize: 12, cursor: "pointer" }}>Abbrechen</button>
          </div>
        )}
      </div>
    </Modal>
  );
}

function AdminModal({ cabinets, boxes, users, products, lowStockList, onClose, onAddCabinet, onAddBox, onDeleteCabinet, onDeleteBox, onAddUser, onDeleteUser, onEditUser, onDownloadPDF, currentUser, totalValue, cabinetValue, boxValue }) {
  const [tab, setTab] = useState(lowStockList && lowStockList.length > 0 ? "knapp" : "cabinets");
  const [newCabName, setNewCabName] = useState("");
  const [newCabBoxes, setNewCabBoxes] = useState(3);
  const [boxTargetCab, setBoxTargetCab] = useState(cabinets[0]?.id || "");
  const [newBoxName, setNewBoxName] = useState("");
  const [uName, setUName] = useState("");
  const [uPin, setUPin] = useState("");
  const [uPinConfirm, setUPinConfirm] = useState("");
  const [uError, setUError] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPin, setEditPin] = useState("");
  const [editPinConfirm, setEditPinConfirm] = useState("");
  const [editError, setEditError] = useState("");
  const [revealedIds, setRevealedIds] = useState(new Set());

  function toggleReveal(id) {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <Modal title="Admin-Bereich" onClose={onClose} width={560}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {[["knapp", "Knapp", AlertTriangle], ["werte", "Werte", Euro], ["cabinets", "Schränke", FolderPlus], ["users", "Benutzer", Users]].map(([key, label, Icon]) => (
          <button
            key={key} onClick={() => setTab(key)}
            style={{
              flex: "1 1 auto", minWidth: 90, padding: "8px 10px", borderRadius: 10, border: `1.5px solid ${tab === key ? C.primary : C.panelBorder}`,
              background: tab === key ? C.mintLight : "#fff", color: tab === key ? C.primary : C.sub, fontWeight: 600, fontSize: 13,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}
          >
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {tab === "knapp" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {lowStockList.length === 0 && (
            <div style={{ fontSize: 13, color: C.sub, textAlign: "center", padding: 20 }}>Alles in Ordnung — keine knappen Produkte.</div>
          )}
          {lowStockList.map((p) => {
            const s = statusColors(statusOf(p));
            const cab = cabinets.find((c) => c.id === p.cabinetId);
            const box = boxes.find((b) => b.id === p.boxId);
            return (
              <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: `1px solid ${C.panelBorder}`, borderRadius: 10, padding: 10 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: C.sub }}>{cab?.name} / {box?.name}</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: s.text, background: s.bg, padding: "4px 10px", borderRadius: 8 }}>
                  {p.quantity} {p.unit}
                </span>
              </div>
            );
          })}
          <PrimaryBtn onClick={onDownloadPDF} disabled={lowStockList.length === 0} style={{ justifyContent: "center", marginTop: 4 }}>
            <Download size={15} /> Als PDF-Faktura herunterladen
          </PrimaryBtn>
        </div>
      )}

      {tab === "werte" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: C.mintLight, border: `1px solid ${C.mint}`, borderRadius: 12, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 12, color: C.primary, fontWeight: 600 }}>Gesamtwert des Lagers</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: C.primary }}>{totalValue.toFixed(2)} €</div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Wert pro Schrank</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {cabinets.map((c) => (
                <div key={c.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: `1px solid ${C.panelBorder}`, borderRadius: 10, padding: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>{cabinetValue(c.id).toFixed(2)} €</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 4, marginLeft: 12 }}>
                    {boxes.filter((b) => b.cabinetId === c.id).map((b) => (
                      <div key={b.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.sub, padding: "2px 8px" }}>
                        <span>{b.name}</span>
                        <span>{boxValue(b.id).toFixed(2)} €</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {cabinets.length === 0 && <div style={{ fontSize: 12, color: C.sub }}>Noch keine Schränke vorhanden.</div>}
            </div>
          </div>
        </div>
      )}

      {tab === "cabinets" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ background: C.panel, borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Neuen Schrank erstellen</div>
            <div style={{ display: "flex", gap: 8 }}>
              <input style={inputStyle} placeholder="Schrankname (z. B. Schrank 1)" value={newCabName} onChange={(e) => setNewCabName(e.target.value)} />
              <input style={{ ...inputStyle, width: 90 }} type="number" min="1" value={newCabBoxes} onChange={(e) => setNewCabBoxes(e.target.value)} />
            </div>
            <PrimaryBtn
              onClick={() => { if (newCabName.trim()) { onAddCabinet(newCabName.trim(), Number(newCabBoxes) || 1); setNewCabName(""); } }}
              style={{ justifyContent: "center" }}
            >
              <Plus size={15} /> Schrank erstellen (mit {newCabBoxes} Fächern)
            </PrimaryBtn>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Vorhandene Schränke</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {cabinets.map((c) => (
                <div key={c.id} style={{ border: `1px solid ${C.panelBorder}`, borderRadius: 10, padding: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 600, fontSize: 13 }}>{c.name}</span>
                    <button onClick={() => onDeleteCabinet(c.id)} style={{ background: "none", border: "none", color: C.redText, cursor: "pointer" }}><Trash2 size={15} /></button>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                    {boxes.filter((b) => b.cabinetId === c.id).map((b) => (
                      <span key={b.id} style={{ fontSize: 11, background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 8, padding: "3px 8px", display: "flex", alignItems: "center", gap: 4 }}>
                        {b.name}
                        <X size={11} style={{ cursor: "pointer" }} onClick={() => onDeleteBox(b.id)} />
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {cabinets.length === 0 && <div style={{ fontSize: 12, color: C.sub }}>Noch keine Schränke vorhanden.</div>}
            </div>
          </div>

          {cabinets.length > 0 && (
            <div style={{ background: C.panel, borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Fach zu Schrank hinzufügen</div>
              <div style={{ display: "flex", gap: 8 }}>
                <select style={inputStyle} value={boxTargetCab} onChange={(e) => setBoxTargetCab(e.target.value)}>
                  {cabinets.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <input style={inputStyle} placeholder="Fachname" value={newBoxName} onChange={(e) => setNewBoxName(e.target.value)} />
              </div>
              <GhostBtn
                onClick={() => { if (newBoxName.trim() && boxTargetCab) { onAddBox(boxTargetCab, newBoxName.trim()); setNewBoxName(""); } }}
                style={{ justifyContent: "center" }}
              >
                <Plus size={15} /> Fach hinzufügen
              </GhostBtn>
            </div>
          )}
        </div>
      )}

      {tab === "users" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ background: C.panel, borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Neuer Admin-Zugang</div>
            <input style={inputStyle} placeholder="Name" value={uName} onChange={(e) => setUName(e.target.value)} />
            <input style={inputStyle} type="password" inputMode="numeric" placeholder="PIN (mind. 4 Ziffern)" value={uPin} onChange={(e) => setUPin(e.target.value)} />
            <input style={inputStyle} type="password" inputMode="numeric" placeholder="PIN bestätigen" value={uPinConfirm} onChange={(e) => setUPinConfirm(e.target.value)} />
            {uError && <div style={{ color: C.redText, fontSize: 12 }}>{uError}</div>}
            <PrimaryBtn
              onClick={() => {
                if (uPin.trim().length < 4) { setUError("PIN muss mindestens 4 Ziffern haben."); return; }
                if (uPin !== uPinConfirm) { setUError("Die PINs stimmen nicht überein."); return; }
                onAddUser(uName, uPin, "admin");
                setUName(""); setUPin(""); setUPinConfirm(""); setUError("");
              }}
              style={{ justifyContent: "center" }}
            >
              <ShieldCheck size={15} /> Admin-Zugang erstellen
            </PrimaryBtn>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Vorhandene Admin-Zugänge</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {users.map((u) =>
                editingUserId === u.id ? (
                  <div key={u.id} style={{ border: `1.5px solid ${C.primary}`, borderRadius: 10, padding: 10, display: "flex", flexDirection: "column", gap: 8 }}>
                    <input style={inputStyle} placeholder="Name" value={editName} onChange={(e) => setEditName(e.target.value)} />
                    <input style={inputStyle} type="password" inputMode="numeric" placeholder="Neuer PIN (mind. 4 Ziffern)" value={editPin} onChange={(e) => setEditPin(e.target.value)} />
                    <input style={inputStyle} type="password" inputMode="numeric" placeholder="PIN bestätigen" value={editPinConfirm} onChange={(e) => setEditPinConfirm(e.target.value)} />
                    {editError && <div style={{ color: C.redText, fontSize: 12 }}>{editError}</div>}
                    <div style={{ display: "flex", gap: 8 }}>
                      <PrimaryBtn
                        onClick={() => {
                          if (editPin.trim().length < 4) { setEditError("PIN muss mindestens 4 Ziffern haben."); return; }
                          if (editPin !== editPinConfirm) { setEditError("Die PINs stimmen nicht überein."); return; }
                          onEditUser(u.id, editName, editPin);
                          setEditingUserId(null); setEditError("");
                        }}
                        style={{ flex: 1, justifyContent: "center", padding: "7px 10px" }}
                      >
                        <Check size={14} /> Speichern
                      </PrimaryBtn>
                      <GhostBtn onClick={() => { setEditingUserId(null); setEditError(""); }} style={{ flex: 1, justifyContent: "center", padding: "7px 10px" }}>
                        Abbrechen
                      </GhostBtn>
                    </div>
                  </div>
                ) : (
                  <div key={u.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: `1px solid ${C.panelBorder}`, borderRadius: 10, padding: 10 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{u.name}</div>
                      <div style={{ fontSize: 11, color: C.sub, display: "flex", alignItems: "center", gap: 6 }}>
                        Admin · PIN: {revealedIds.has(u.id) ? u.pin : "•".repeat(u.pin.length)}
                        <button onClick={() => toggleReveal(u.id)} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, display: "flex" }}>
                          {revealedIds.has(u.id) ? <EyeOff size={13} /> : <Eye size={13} />}
                        </button>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button
                        onClick={() => { setEditingUserId(u.id); setEditName(u.name); setEditPin(""); setEditPinConfirm(""); setEditError(""); }}
                        style={{ background: "none", border: "none", color: C.sub, cursor: "pointer" }}
                      >
                        <Pencil size={15} />
                      </button>
                      {u.id !== currentUser.id && (
                        <button onClick={() => onDeleteUser(u.id)} style={{ background: "none", border: "none", color: C.redText, cursor: "pointer" }}><Trash2 size={15} /></button>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <p style={{ fontSize: 11, color: C.muted }}>
            Hinweis: Mitarbeiter ohne Admin-Zugang können die Praxis-App direkt ohne Anmeldung nutzen (Schränke, Suche, Bestand abbuchen). Nur Admin-Konten benötigen Name + PIN.
          </p>
        </div>
      )}
    </Modal>
  );
}

function LowStockModal({ list, cabinets, boxes, onClose, onDownload, autoDownload, setAutoDownload }) {
  return (
    <Modal title="Knappe Produkte" onClose={onClose} width={480}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {list.length === 0 && <div style={{ fontSize: 13, color: C.sub, textAlign: "center", padding: 20 }}>Alles in Ordnung — keine knappen Produkte.</div>}
        {list.map((p) => {
          const s = statusColors(statusOf(p));
          const cab = cabinets.find((c) => c.id === p.cabinetId);
          const box = boxes.find((b) => b.id === p.boxId);
          return (
            <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: `1px solid ${C.panelBorder}`, borderRadius: 10, padding: 10 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: C.sub }}>{cab?.name} / {box?.name}</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: s.text, background: s.bg, padding: "4px 10px", borderRadius: 8 }}>
                {p.quantity} {p.unit}
              </span>
            </div>
          );
        })}
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <PrimaryBtn onClick={onDownload} disabled={list.length === 0} style={{ flex: 1, justifyContent: "center" }}>
            <Download size={15} /> PDF herunterladen
          </PrimaryBtn>
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.sub, marginTop: 4, cursor: "pointer" }}>
          <input type="checkbox" checked={autoDownload} onChange={(e) => setAutoDownload(e.target.checked)} />
          PDF bei neuer Knappheit automatisch herunterladen (nur für diese Sitzung)
        </label>
      </div>
    </Modal>
  );
}
