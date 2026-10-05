function InstagramLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.2 8.2h3V4.3c-.52-.07-2.3-.23-4.4-.23-4.34 0-7.31 2.65-7.31 7.52v4.2H.58v4.36h4.91V31h6.02V20.15h4.71l.75-4.36h-5.46v-3.77c0-1.26.34-2.12 2.69-2.12Z" transform="matrix(.72 0 0 .72 5.598 -.625)" />
    </svg>
  );
}

function YoutubeLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.5 7.2a3 3 0 0 0-2.1-2.12C18.55 4.58 12 4.58 12 4.58s-6.55 0-8.4.5A3 3 0 0 0 1.5 7.2 31 31 0 0 0 1 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.12c1.85.5 8.4.5 8.4.5s6.55 0 8.4-.5a3 3 0 0 0 2.1-2.12A31 31 0 0 0 23 12a31 31 0 0 0-.5-4.8ZM9.75 15.3V8.7L15.5 12l-5.75 3.3Z" />
    </svg>
  );
}

function WhatsappLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.4-4.2A8.5 8.5 0 1 1 20.5 11.7Z" />
      <path d="M8.2 7.7c.3-.4.7-.4 1-.1l1.1 1.5c.2.3.2.6 0 .9l-.6.8c.8 1.7 2 2.9 3.7 3.7l.8-.6c.3-.2.6-.2.9 0l1.5 1.1c.3.3.3.7-.1 1-1 .8-2.2 1-3.4.5a10.2 10.2 0 0 1-5.4-5.4c-.5-1.2-.3-2.4.5-3.4Z" />
    </svg>
  );
}

function SnapchatLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3.2c-3 0-5 2.1-5 5v2.1c0 .8-.4 1.3-1.2 1.6l-1.4.6c-.5.2-.5.9 0 1.1l1.9.8c.4.2.7.5.8.9.3 1.3 1.1 2 2.4 2.2.7.1 1.1.4 1.3 1 .2.4.6.6 1 .5.7-.2 1.3-.2 2 0 .4.1.8-.1 1-.5.2-.6.6-.9 1.3-1 1.3-.2 2.1-.9 2.4-2.2.1-.4.4-.7.8-.9l1.9-.8c.5-.2.5-.9 0-1.1l-1.4-.6c-.8-.3-1.2-.8-1.2-1.6V8.2c0-2.9-2-5-5-5Z" transform="translate(-.8 .887)" />
    </svg>
  );
}

function TiktokLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.6 3h3.1a5.2 5.2 0 0 0 3.2 3.2v3.1a8.3 8.3 0 0 1-3.2-1.1v6.2a6.1 6.1 0 1 1-6.1-6.1h.9v3.2a3 3 0 1 0 2.1 2.9V3Z" transform="translate(-1.2 .25)" />
    </svg>
  );
}

function XLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.24 2h3.31l-7.23 8.26L22.82 22h-6.66l-5.21-6.82L4.98 22H1.67l7.73-8.84L1.25 2H8.1l4.71 6.23L18.24 2Zm-1.16 17.93h1.83L7.1 3.96H5.13l11.95 15.97Z" />
    </svg>
  );
}

export const socialChannels = [
  { label: "Facebook", Icon: FacebookLogo },
  { label: "Instagram", Icon: InstagramLogo },
  { label: "YouTube", Icon: YoutubeLogo },
  { label: "WhatsApp", Icon: WhatsappLogo },
  { label: "Snapchat", Icon: SnapchatLogo },
  { label: "TikTok", Icon: TiktokLogo },
  { label: "X (Twitter)", Icon: XLogo },
];
