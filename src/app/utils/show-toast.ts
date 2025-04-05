export function showToast(message: string, color: string): void {
  const toast = document.createElement('div');
  toast.style.backgroundColor = color;
  toast.style.padding = '15px';
  toast.style.borderRadius = '5px';
  toast.style.color = '#fff';
  toast.style.position = 'fixed';
  toast.style.top = '10px';
  toast.style.right = '45%';
  toast.innerHTML = message; // Set innerHTML to render the HTML
  document.body.appendChild(toast);

  setTimeout(() => document.body.removeChild(toast), 3000);
}
