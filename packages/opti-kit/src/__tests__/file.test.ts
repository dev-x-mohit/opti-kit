import { describe, it, expect } from 'vitest';
import { formatBytes, getFileExtension, getBaseName, getMimeType, isImage, isVideo, isAudio, isDocument } from '../file';

describe('file utilities', () => {
  it('formatBytes formats bytes correctly', () => {
    expect(formatBytes(0)).toBe('0 Bytes');
    expect(formatBytes(1024)).toBe('1 KB');
    expect(formatBytes(1024 * 1024)).toBe('1 MB');
  });

  it('getFileExtension returns correct extension', () => {
    expect(getFileExtension('image.png')).toBe('png');
    expect(getFileExtension('archive.tar.gz')).toBe('gz');
    expect(getFileExtension('noextension')).toBe('');
  });

  it('getBaseName returns correct base name', () => {
    expect(getBaseName('image.png')).toBe('image');
    expect(getBaseName('archive.tar.gz')).toBe('archive.tar');
    expect(getBaseName('noextension')).toBe('noextension');
  });

  it('getMimeType returns correct MIME type', () => {
    expect(getMimeType('image.png')).toBe('image/png');
    expect(getMimeType('document.pdf')).toBe('application/pdf');
    expect(getMimeType('unknown.ext')).toBeUndefined();
  });

  it('isImage checks if file is an image', () => {
    expect(isImage('test.jpg')).toBe(true);
    expect(isImage('test.png')).toBe(true);
    expect(isImage('test.pdf')).toBe(false);
  });

  it('isVideo checks if file is a video', () => {
    expect(isVideo('test.mp4')).toBe(true);
    expect(isVideo('test.avi')).toBe(true);
    expect(isVideo('test.png')).toBe(false);
  });

  it('isAudio checks if file is audio', () => {
    expect(isAudio('test.mp3')).toBe(true);
    expect(isAudio('test.wav')).toBe(true);
    expect(isAudio('test.mp4')).toBe(false);
  });

  it('isDocument checks if file is a document', () => {
    expect(isDocument('test.pdf')).toBe(true);
    expect(isDocument('test.docx')).toBe(true);
    expect(isDocument('test.txt')).toBe(true);
    expect(isDocument('test.png')).toBe(false);
  });
});
