"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { siteContent } from "@/content/site";

export function HeaderNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const navigation = siteContent.navigation;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) {
      dialog.close();
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  const close = () => setIsOpen(false);
  const closeOnBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
  };

  return (
    <header data-section="header-navigation" className="sticky top-0 z-50">
      <nav aria-label={navigation.label} className="relative flex h-[76px] items-center justify-between px-4 py-5 sm:px-8">
        <a href={navigation.home.href} className="flex h-9 w-[106px] items-center font-heading text-xs leading-3 font-semibold uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          <span aria-hidden="true" className="mr-1.5 block size-2.5 rotate-45 border border-primary" />
          {navigation.home.label}
        </a>
        <span className="absolute left-[60%] hidden font-heading text-xs leading-4 tracking-[1.56px] text-muted-foreground uppercase sm:block">
          {siteContent.location}
        </span>
        <span className="absolute left-[80%] hidden font-heading text-xs leading-4 tracking-[1.56px] text-muted-foreground uppercase lg:block">
          {navigation.coordinates.map((coordinate) => <span key={coordinate} className="block">{coordinate}</span>)}
        </span>
        <button ref={triggerRef} type="button" aria-expanded={isOpen} aria-controls="navigation-dialog" aria-haspopup="dialog" onClick={() => setIsOpen(true)} className="relative h-9 w-20 bg-[#252e20]/80 font-heading text-sm leading-5 font-semibold uppercase hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          <span aria-hidden="true" className="absolute top-0 left-0 size-1 border-t border-l border-primary" />
          <span aria-hidden="true" className="absolute right-0 bottom-0 size-1 border-r border-b border-primary" />
          {navigation.menu}
        </button>
      </nav>
      <dialog ref={dialogRef} id="navigation-dialog" aria-labelledby="navigation-dialog-title" onCancel={close} onClose={close} onClick={closeOnBackdrop} data-lenis-prevent className="fixed inset-x-6 top-[50px] bottom-[50px] z-[90] m-0 h-[calc(100dvh-100px)] max-h-[760px] w-auto max-w-none overflow-y-auto border-0 bg-[var(--background-stroke-1)] p-0 text-foreground backdrop:bg-black/75 sm:right-[50px] sm:left-auto sm:w-[380px]">
        <div className="flex min-h-full flex-col p-6">
          <div className="flex h-10 items-center justify-between">
            <h2 id="navigation-dialog-title" className="font-heading text-xs leading-4 font-normal uppercase tracking-[1.56px]">{navigation.label}</h2>
            <button type="button" autoFocus onClick={close} className="h-10 px-2 font-heading text-sm leading-5 font-semibold uppercase hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">{navigation.close}</button>
          </div>
          <ul className="mt-[68px] mb-auto flex flex-col pb-12">
            {navigation.links.map((link, index) => (
              <li key={link.label}>
                <a href={link.href} onClick={close} className="group flex items-center justify-between px-2 py-3 font-heading text-[40px] leading-[0.86] font-medium uppercase hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-none sm:text-[56px]">
                  <span>{link.label}</span><span aria-hidden="true" className="font-mono text-xs tracking-normal">0{index + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="border-t border-foreground/25 pt-6">
            <p className="font-heading text-xs leading-4 font-normal uppercase tracking-[1.56px]">{navigation.connections}</p>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-4 font-heading text-lg font-semibold uppercase">
              {[siteContent.footer.message, siteContent.footer.cv, ...siteContent.footer.links].map((link) => (
                <li key={link.label}><a href={link.href} onClick={close} className="underline-offset-4 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">{link.label}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </dialog>
    </header>
  );
}
