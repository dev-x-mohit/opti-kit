/**
 * Formats a file size in bytes to a human-readable string.
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0 || isNaN(bytes)) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Extracts the extension from a file name.
 */
export function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop()!.toLowerCase() : '';
}

/**
 * Gets the base name of a file (name without extension).
 */
export function getBaseName(filename: string): string {
  const idx = filename.lastIndexOf('.');
  return idx !== -1 ? filename.substring(0, idx) : filename;
}

const mimeTypes: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  webp: 'image/webp',
  mp4: 'video/mp4',
  webm: 'video/webm',
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  pdf: 'application/pdf',
  json: 'application/json',
  txt: 'text/plain',
  csv: 'text/csv',
  html: 'text/html',
};

/**
 * Attempts to guess the MIME type based on file extension.
 */
export function getMimeType(filename: string): string | undefined {
  const ext = getFileExtension(filename);
  return mimeTypes[ext];
}

/**
 * Checks if a file name represents an image.
 */
export function isImage(filename: string): boolean {
  const ext = getFileExtension(filename);
  return ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'bmp', 'ico'].includes(ext);
}

/**
 * Checks if a file name represents a video.
 */
export function isVideo(filename: string): boolean {
  const ext = getFileExtension(filename);
  return ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'].includes(ext);
}

/**
 * Checks if a file name represents audio.
 */
export function isAudio(filename: string): boolean {
  const ext = getFileExtension(filename);
  return ['mp3', 'wav', 'ogg', 'flac', 'aac'].includes(ext);
}

/**
 * Checks if a file name represents a document.
 */
export function isDocument(filename: string): boolean {
  const ext = getFileExtension(filename);
  return ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv'].includes(ext);
}

/**
 * Reads a File or Blob as a Data URL. (Browser only)
 */
export function readAsDataURL(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Reads a File or Blob as Text. (Browser only)
 */
export function readAsText(file: Blob, encoding = 'utf-8'): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(file, encoding);
  });
}
