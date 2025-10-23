export default function LogoIcon() {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-8 h-8 rounded-md border"
        style={{
          backgroundColor: "var(--brand-4)",
          borderColor: "var(--brand-3)",
        }}
      />
      <span className="logo-text text-xl">Ecommerce</span>
    </div>
  );
}
