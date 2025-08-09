import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Rocket, 
  GraduationCap, 
  Package, 
  Users, 
  Globe, 
  Menu, 
  X,
  User
} from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";

const LANGUAGES = [
  { code: 'ru', label: 'RU' },
  { code: 'kz', label: 'KZ' },
  { code: 'en', label: 'EN' }
];

const NAVIGATION_ITEMS = [
  { label: 'Соревнования', href: '/competitions', icon: Rocket },
  { label: 'Курсы', href: '/courses', icon: GraduationCap },
  { label: 'Продукты', href: '/products', icon: Package },
  { label: 'О нас', href: '/about', icon: Users },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('ru');
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center" aria-label="AEROO — образовательная платформа">
              <img
                src="/lovable-uploads/b69a9019-60d9-465c-8c97-374a0558b678.png"
                alt="Логотип AEROO"
                className="h-8 w-auto"
                width={220}
                height={32}
                decoding="async"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="group flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon className="h-4 w-4 group-hover:glow-primary transition-all" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="hidden sm:flex items-center space-x-1 bg-muted rounded-lg p-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setCurrentLang(lang.code)}
                  className={cn(
                    "px-3 py-1 text-sm rounded-md transition-colors",
                    currentLang === lang.code
                      ? "bg-primary text-primary-foreground glow-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {lang.label}
                </button>
              ))}
            </div>

{/* Profile/Login or Dashboard */}
{user ? (
  <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
    <Link to="/dashboard">
      <User className="h-4 w-4 mr-2" />
      Личный кабинет
    </Link>
  </Button>
) : (
  <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
    <Link to="/auth">
      <User className="h-4 w-4 mr-2" />
      Войти
    </Link>
  </Button>
)}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border/50">
            {NAVIGATION_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {/* Mobile Language Switcher */}
            <div className="flex items-center space-x-2 pt-4 border-t border-border/50">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <div className="flex space-x-1">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className={cn(
                      "px-2 py-1 text-sm rounded transition-colors",
                      currentLang === lang.code
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
            
{user ? (
  <Button className="w-full btn-cosmic" asChild>
    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
      <User className="h-4 w-4 mr-2" />
      Личный кабинет
    </Link>
  </Button>
) : (
  <Button className="w-full btn-cosmic" asChild>
    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
      <User className="h-4 w-4 mr-2" />
      Войти
    </Link>
  </Button>
)}
          </div>
        )}
      </div>
    </header>
  );
}