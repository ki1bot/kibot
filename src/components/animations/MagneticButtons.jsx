"use client";

import { useEffect } from "react";

const BUTTON_SELECTOR = [
  "button",
  "a[href]",
  "[role='button']",
  ".magnetic-button",
].join(",");

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function isValidMagneticTarget(element) {
  if (!(element instanceof HTMLElement)) return false;

  if (element.hasAttribute("data-disable-magnetic")) return false;
  if (element.closest("[data-disable-magnetic]")) return false;

  if (element.hasAttribute("disabled")) return false;
  if (element.getAttribute("aria-disabled") === "true") return false;

  const tagName = element.tagName.toLowerCase();
  const role = element.getAttribute("role");
  const className =
    typeof element.className === "string" ? element.className : "";

  if (tagName === "button") return true;
  if (role === "button") return true;
  if (element.classList.contains("magnetic-button")) return true;

  if (tagName === "a") {
    return /rounded|inline-flex|flex|px-|py-|border|bg-|shadow|button|btn|group/.test(
      className,
    );
  }

  return false;
}

function getMagneticTarget(target) {
  if (!(target instanceof Element)) return null;

  const element = target.closest(BUTTON_SELECTOR);

  if (!isValidMagneticTarget(element)) return null;

  return element;
}

function resetMagneticTarget(element) {
  if (!(element instanceof HTMLElement)) return;

  element.classList.remove("is-magnetic-near");
  element.style.setProperty("--magnetic-x", "0px");
  element.style.setProperty("--magnetic-y", "0px");
  element.style.setProperty("--magnetic-scale", "1");
  element.style.setProperty("--magnetic-glow-opacity", "0");
  element.style.setProperty("--magnetic-spot-x", "50%");
  element.style.setProperty("--magnetic-spot-y", "50%");
}

export function MagneticButtons() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const pointerIsCoarse = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || pointerIsCoarse) return;

    let activeTarget = null;
    let latestPointerEvent = null;
    let animationFrame = null;

    function updateActiveTarget() {
      if (!activeTarget || !latestPointerEvent) {
        animationFrame = null;
        return;
      }

      const rect = activeTarget.getBoundingClientRect();

      if (rect.width === 0 || rect.height === 0) {
        resetMagneticTarget(activeTarget);
        animationFrame = null;
        return;
      }

      const pointerX = latestPointerEvent.clientX - rect.left;
      const pointerY = latestPointerEvent.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const distanceX = pointerX - centerX;
      const distanceY = pointerY - centerY;

      const moveX = clamp((distanceX / rect.width) * 16, -9, 9);
      const moveY = clamp((distanceY / rect.height) * 16, -9, 9);

      const spotX = clamp((pointerX / rect.width) * 100, 0, 100);
      const spotY = clamp((pointerY / rect.height) * 100, 0, 100);

      activeTarget.classList.add("magnetic-target", "is-magnetic-near");
      activeTarget.style.setProperty("--magnetic-x", `${moveX.toFixed(2)}px`);
      activeTarget.style.setProperty("--magnetic-y", `${moveY.toFixed(2)}px`);
      activeTarget.style.setProperty("--magnetic-scale", "1.035");
      activeTarget.style.setProperty("--magnetic-glow-opacity", "0.85");
      activeTarget.style.setProperty(
        "--magnetic-spot-x",
        `${spotX.toFixed(2)}%`,
      );
      activeTarget.style.setProperty(
        "--magnetic-spot-y",
        `${spotY.toFixed(2)}%`,
      );

      animationFrame = null;
    }

    function handlePointerMove(event) {
      const nextTarget = getMagneticTarget(event.target);

      if (!nextTarget) {
        if (activeTarget) {
          resetMagneticTarget(activeTarget);
          activeTarget = null;
        }

        return;
      }

      if (activeTarget && activeTarget !== nextTarget) {
        resetMagneticTarget(activeTarget);
      }

      activeTarget = nextTarget;
      latestPointerEvent = event;

      if (animationFrame) return;

      animationFrame = requestAnimationFrame(updateActiveTarget);
    }

    function handlePointerOut(event) {
      if (!activeTarget) return;

      const relatedTarget = event.relatedTarget;

      if (
        relatedTarget instanceof Node &&
        activeTarget.contains(relatedTarget)
      ) {
        return;
      }

      resetMagneticTarget(activeTarget);
      activeTarget = null;
    }

    function handleWindowBlur() {
      if (activeTarget) {
        resetMagneticTarget(activeTarget);
        activeTarget = null;
      }
    }

    document.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    document.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", handleWindowBlur);

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      if (activeTarget) {
        resetMagneticTarget(activeTarget);
      }
    };
  }, []);

  return null;
}
