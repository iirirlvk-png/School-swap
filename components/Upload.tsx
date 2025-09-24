

import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Theme } from '../types';
import { OFFER_CATEGORIES } from '../constants';
import SpinnerIcon from './icons/SpinnerIcon';

interface UploadProps {
  theme: Theme;
}

const preTranscribedText = `3. Our client states that, our client's father Later P.G.Amalraj was employed in TVS Lucas Company, Padi, Chennai as Tool Room In-charge and retired from service on attaining superannuation. During his lifetime our client's father had left behind savings, investments and his self acquired property for his legal heirs. These source enabled the 1st of you to purchase properties mentioned herein under as serial Nos. .................... Hence all the properties which was purchased by the 1st of you and your husband late P.G.Amalraj was only out of the income and sources left behind by late P.G.Amalraj. The said properties have been jointly enjoyed by the joint family members and all the joint family members have equal share in the schedule mentioned properties.

4. Our client states that, while it is so, our clients later got married and settled with their respective families. After which the 1st and 2nd of are in joint possession of the schedule mentioned properties. Foregoing to as said the entire properties belong to the joint family and are being jointly enjoyed by the joint family members. Latterly few years after the death of late P.G.Amalraj that is during the year 2014 our clients began to ask the 1st and 2nd of you for partition of the schedule mentioned properties seeking for their respective share. Whenever our clients met the 1st and 2nd of you during family functions and casual visit of the 1st of you, both of you were evasive in having discussion regarding the partition and gave inexplicit replies which left our client perplexed, however due to the trust they had towards their own mother and brother our clients were never skeptical on the 1st and 2nd of you and continued to seek for partition whenever they had chances to meet the 1st and 2nd of you.

5. Our client states that, after seeing the determination of our clients in seeking partition the 1st and 2nd of you became hand in glove to usurp the entire share and deprive our clients from their legal shares. It is also pertinent to mention that our client Mrs.P.A.Santha Antoniette was married to one Mr.G.I.Christu Raj on 18.05.1997 and her husband was working in Oman, hence after marriage the 1st of`;


const Upload: React.FC<UploadProps> = ({ theme }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(preTranscribedText);
  const [category, setCategory] = useState(OFFER_CATEGORIES[0]);
  const [resourceImage, setResourceImage] = useState<File | null>(null);
  const [resourceImagePreviewUrl, setResourceImagePreviewUrl] = useState<string | null>(null);
  const [transcriptionFile, setTranscriptionFile] = useState<File | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionError, setTranscriptionError] = useState<string | null>(null);
  
  const resourceImageInputRef = useRef<HTMLInputElement>(null);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleTranscribe = async () => {
    if (!transcriptionFile) return;
    setIsTranscribing(true);
    setTranscriptionError(null);

    try {
      const base64Image = await fileToBase64(transcriptionFile);
      const mimeType = transcriptionFile.type;

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
          parts: [
            { text: "Transcribe all handwritten and typed text from this image exactly as it appears. Preserve the original line breaks and formatting." },
            { inlineData: { mimeType, data: base64Image } }
          ]
        },
      });

      setDescription(prev => prev ? `${prev}\n\n--- Transcribed Text ---\n${response.text}` : response.text);
    
    } catch (error) {
      console.error("Transcription failed:", error);
      setTranscriptionError("Could not transcribe the image. Please try a different image or check the file format.");
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleTranscriptionFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setTranscriptionFile(e.target.files[0]);
    }
  }
  
  const handleResourceImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          setResourceImage(file);
          setResourceImagePreviewUrl(URL.createObjectURL(file));
      }
  }

  const handleRemoveResourceImage = () => {
    setResourceImage(null);
    setResourceImagePreviewUrl(null);
    if (resourceImageInputRef.current) {
        resourceImageInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Share a Resource</h2>

      <form className={`p-8 rounded-3xl space-y-6 ${theme.cardBg} border border-white/10`} onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="title" className={`block text-sm font-medium mb-2 ${theme.textSecondary}`}>Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., 'Calculus 101 Final Exam Notes'"
            className={`w-full px-4 py-3 rounded-lg border-none focus:ring-2 focus:${theme.accent.replace('bg-', 'ring-')} ${theme.secondary} ${theme.textPrimary} placeholder:${theme.textSecondary}`}
          />
        </div>

        <div>
            <label htmlFor="transcription-file" className={`block text-sm font-medium mb-2 ${theme.textSecondary}`}>Transcribe from Image</label>
            <div className={`flex flex-col sm:flex-row items-center gap-4 p-3 rounded-lg ${theme.secondary}`}>
                <input
                    id="transcription-file"
                    type="file"
                    accept="image/*"
                    onChange={handleTranscriptionFileChange}
                    className={`flex-grow w-full text-sm ${theme.textSecondary} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:${theme.primary} file:${theme.buttonText} hover:file:opacity-90`}
                />
                <button
                    type="button"
                    onClick={handleTranscribe}
                    disabled={!transcriptionFile || isTranscribing}
                    className={`w-full sm:w-auto flex items-center justify-center px-4 py-2 rounded-lg font-semibold transition ${theme.accent} ${theme.buttonText} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {isTranscribing ? <SpinnerIcon /> : 'Transcribe'}
                </button>
            </div>
            {transcriptionError && <p className="mt-2 text-sm text-red-400">{transcriptionError}</p>}
        </div>

        <div>
          <label htmlFor="description" className={`block text-sm font-medium mb-2 ${theme.textSecondary}`}>Description</label>
          <textarea
            id="description"
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add details like condition, edition, or topics covered. Or, transcribe text from an image above."
            className={`w-full px-4 py-3 rounded-lg border-none focus:ring-2 focus:${theme.accent.replace('bg-', 'ring-')} ${theme.secondary} ${theme.textPrimary} placeholder:${theme.textSecondary}`}
          ></textarea>
        </div>

        <div>
          <label htmlFor="category" className={`block text-sm font-medium mb-2 ${theme.textSecondary}`}>Category</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className={`w-full px-4 py-3 rounded-lg border-none focus:ring-2 focus:${theme.accent.replace('bg-', 'ring-')} ${theme.secondary} ${theme.textPrimary}`}>
            {OFFER_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
          </select>
        </div>
        
        <div>
          <label htmlFor="resource-image" className={`block text-sm font-medium mb-2 ${theme.textSecondary}`}>Upload Image (Optional)</label>
          {resourceImagePreviewUrl ? (
            <div className="relative group">
                <img src={resourceImagePreviewUrl} alt="Resource preview" className="w-full h-auto max-h-64 object-contain rounded-lg" />
                <button
                    type="button"
                    onClick={handleRemoveResourceImage}
                    className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-2 leading-none transition-opacity opacity-0 group-hover:opacity-100"
                    aria-label="Remove image"
                >
                   &#x2715;
                </button>
            </div>
          ) : (
            <div className={`border-2 border-dashed border-white/20 rounded-lg p-6 text-center ${theme.secondary}`}>
              <input ref={resourceImageInputRef} id="resource-image" type="file" accept="image/*" onChange={handleResourceImageChange} className={`w-full text-sm ${theme.textSecondary} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:${theme.primary} file:${theme.buttonText} hover:file:opacity-90`} />
            </div>
          )}
        </div>
        
        <button type="submit" className={`w-full py-3 mt-4 rounded-xl font-semibold transition ${theme.primary} ${theme.buttonText} hover:opacity-90`}>
          Post Resource
        </button>
      </form>
    </div>
  );
};

export default Upload;
