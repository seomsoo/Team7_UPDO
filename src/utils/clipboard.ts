export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // 보안 컨텍스트(https) + Clipboard API 지원 시
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback (구형 브라우저 호환용)
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);

    return success;
  } catch {
    return false;
  }
}
