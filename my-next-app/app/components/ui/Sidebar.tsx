"use client";

import { cn } from "../../lib/utils";
import { LinkProps } from "next/link";
import React, { useState, createContext, useContext, useEffect } from "react";
import { AnimatePresence, motion, HTMLMotionProps, PanInfo } from "framer-motion";
import { IconMenu2 } from "@tabler/icons-react";
import Image from "next/image";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Updated type: Just changing onClick to React's standard signature
type MotionProps = {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>; // Updated here
  onDrag?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  whileHover?: any;
  whileTap?: any;
} & Omit<HTMLMotionProps<"div">, "onDrag" | "onClick">;

const MotionDiv = motion.div as unknown as React.FC<MotionProps>;
const MotionSpan = motion.span as unknown as React.FC<MotionProps>;

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: Omit<MotionProps, 'onDrag'>) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {isMobile ? (
        <MobileSidebar {...props} />
      ) : (
        <DesktopSidebar {...props} />
      )}
    </>
  );
};

export const DesktopSidebar = ({
  children,
  ...props
}: MotionProps) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <MotionDiv
    className={cn(
      "h-screen px-4 py-6 hidden md:flex md:flex-col flex-shrink-0 shadow-xl overflow-x-hidden",
      "bg-gradient-to-b from-[#1a1a1a] via-[#0a0a0a] to-[#050505]",
    )}
      animate={{
        width: animate ? (open ? "280px" : "80px") : "280px",
      }}
      transition={{
        duration: 0.15,
        ease: "easeInOut",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
    </MotionDiv>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: Omit<MotionProps, 'onDrag'>) => {
  const { open, setOpen } = useSidebar();

  const handleNavigation = (page: string) => {
    window.dispatchEvent(new CustomEvent('navigationRequest', { detail: page }));
    setOpen(false);
  };

  return (
    <>
      <div
        className={cn(
          "h-16 px-4 flex flex-row md:hidden items-center justify-between w-full fixed top-0 z-30 overflow-x-hidden",
          "bg-black/20 backdrop-blur-lg",
          "border-b border-white/10",
          className
        )}
      >
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavigation('dashboard')}
          onTouchEnd={() => handleNavigation('dashboard')}
        >
          <Image
            src="/kira.jpg"
            alt="KIRA Logo"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-lg font-bold text-white">KIRA</span>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <IconMenu2 className="text-neutral-100 w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            />

            <MotionDiv
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.2 }}
              className={cn(
                "fixed inset-y-0 left-0 w-[280px] p-6 z-50 md:hidden overflow-y-auto overflow-x-hidden",
                "bg-black/20 backdrop-blur-lg",
                "border-b border-white/10",
                className
              )}
              {...props}
            >
              <div className="flex flex-col h-full">
                {children}
              </div>
            </MotionDiv>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  onClick,
  ...props
}: {
  link: Links;
  className?: string;
  onClick?: () => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> &
  Partial<LinkProps>) => {
  const { open, animate } = useSidebar();
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center justify-start gap-3 group/sidebar py-2 px-3 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="min-w-[24px] flex items-center justify-center flex-shrink-0">
        {link.icon}
      </div>

      <MotionSpan
        initial={false}
        animate={{
          width: animate ? (open ? "auto" : 0) : "auto",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        transition={{
          duration: 0.15,
          ease: "easeInOut",
        }}
        style={{
          display: "block",
          overflow: "hidden"
        }}
        className="text-neutral-100 text-sm font-medium group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre"
      >
        {link.label}
      </MotionSpan>
    </div>
  );
};