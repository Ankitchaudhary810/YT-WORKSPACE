"use client";

export function Video() {
  return (
    <video width="320" height="240" controls preload="none">
      <source src="https://youtu.be/JNoiAumC94g" />
      <track srcLang="en" label="English" />
      Your browser does not support the video tag.
    </video>
  );
}
