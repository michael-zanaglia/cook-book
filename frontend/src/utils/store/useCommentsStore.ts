import { create } from 'zustand'
import { CommentsStore } from '../types/types'

export const useCommentsStore = create<CommentsStore>((set) =>({
    comments: null,
    setComments: (data) => set((state)=>({
        comments: typeof data === 'function' 
        ? data(state.comments)    
        : data
        }))
    
}))