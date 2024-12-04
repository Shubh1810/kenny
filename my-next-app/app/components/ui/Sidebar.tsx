"use client";
import { cn } from "../../lib/utils";
import { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2} from "@tabler/icons-react";
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

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

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
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

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

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-screen px-4 py-6 hidden md:flex md:flex-col sidebar-gradient bg-gradient-to-b from-[#000238] via-[#1c0018] to-[#140405] flex-shrink-0 shadow-xl overflow-x-hidden",
          className
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
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
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
        {...props}
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            />
            
            <motion.div
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
            >
              <div className="flex flex-col h-full">
                {children}
              </div>
            </motion.div>
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
  props?: LinkProps;
}) => {
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

      <motion.span
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
      </motion.span>
    </div>
  );
};
