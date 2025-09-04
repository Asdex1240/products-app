import { create } from "zustand";

interface TemporaslCameraStoreState {
  selectedImages: string[];
  addSelectedImage: (image: string) => void;
  clearImages: () => void;
}

export const useCameraStore = create<TemporaslCameraStoreState>()((set) =>({
  selectedImages: [],
  addSelectedImage: (image) => {
    set( (state) => ({ selectedImages: [...state.selectedImages, image] }) )
  },

  clearImages: () => set({ selectedImages: []})

}))