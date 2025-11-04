import * as React from 'react'
import {cn} from '../../lib/utils'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
}

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
}

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {
}

const AvatarContext = React.createContext<{ hasImage: boolean; setHasImage: (v: boolean) => void } | null>(null)

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(({className, ...props}, ref) => {
    const [hasImage, setHasImage] = React.useState(true)
    return (
        <AvatarContext.Provider value={{hasImage, setHasImage}}>
            <div
                data-slot="avatar"
                ref={ref}
                className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200 text-sm', className)}
                {...props}
            />
        </AvatarContext.Provider>
    )
})
Avatar.displayName = 'Avatar'

export const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(({
                                                                                     className,
                                                                                     onError,
                                                                                     ...props
                                                                                 }, ref) => {
    const ctx = React.useContext(AvatarContext)
    const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
        ctx?.setHasImage(false)
        onError?.(e)
    }
    return (
        <img
            ref={ref}
            className={cn('aspect-square h-full w-full object-cover', className)}
            onError={handleError}
            {...props}
        />
    )
})
AvatarImage.displayName = 'AvatarImage'

export const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(({
                                                                                          className,
                                                                                          children,
                                                                                          ...props
                                                                                      }, ref) => {
    const ctx = React.useContext(AvatarContext)
    return (
        <span
            ref={ref}
            className={cn(
                'absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-600 select-none',
                ctx?.hasImage ? 'hidden' : '',
                className,
            )}
            {...props}
        >
      {children}
    </span>
    )
})
AvatarFallback.displayName = 'AvatarFallback'

export default Avatar

