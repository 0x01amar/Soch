import Document from '../models/Document.js';

export const runOneTimeMigration = async () => {
  console.log('🚀 Starting one-time migration...');
  try {
    // Migration 1: Ensure editorPreferences are initialized for all documents
    const result = await Document.updateMany(
      { editorPreferences: { $exists: false } },
      { 
        $set: { 
          editorPreferences: {
            currentFont: 'Inter',
            currentFontSize: '3',
            currentStyle: 'Normal Text',
            currentAlign: 'Left',
            activeFormats: {
              bold: false,
              italic: false,
              underline: false,
              strikeThrough: false,
              unorderedList: false,
              orderedList: false,
              blockquote: false,
              codeBlock: false
            }
          }
        } 
      }
    );

    // Migration 2: Ensure documents have a default title if missing
    const result2 = await Document.updateMany(
      { title: { $exists: false } },
      { $set: { title: 'Untitled Document' } }
    );

    console.log(`✅ Migration completed. Updated ${result.modifiedCount} prefs and ${result2.modifiedCount} titles.`);
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
};
