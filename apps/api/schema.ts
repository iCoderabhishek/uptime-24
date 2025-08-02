import { z } from 'zod'

export const createWebsite = z.object({
    url: z.string(),
    
})

export const getWebsiteStatus = z.object({
    websiteId: z.string()
})

export const deleteWebsite = z.object({
    websiteId: z.string()
})