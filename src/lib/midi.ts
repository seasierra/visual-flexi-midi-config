import type { NoteMessage } from '@midival/core';

export type MidiEvent = { name: string; type: 'Note' | 'CC'; data: NoteMessage };
