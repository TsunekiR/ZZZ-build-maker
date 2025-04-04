import * as React from "react"

import { cn } from "@/lib/utils"
import Image from "next/image"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-3xl border-2 bg-card text-card-foreground shadow", className)}
    {...props}>
        <div className="bg-[auto_5px] bg-[url(https://wiki.hoyolab.com/_nuxt/img/card-shading-bg.706c7b9.png)] bg-repeat">
            {props.children}
        </div>
  </div>
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
    <>
        <div
            ref={ref}
            className={cn("flex flex-col space-y-1.5 p-6 bg-[#000000] rounded-t-3xl border-b-2 text-2xl", className)}
            {...props}>
            <div className="flex flex-row w-full  justify-between">
              <div className="flex flex-row">
                    {props.children}
                    <Image className="ml-3" src="/cardHeaderPre.png" alt="header" width={48} height={30}/>
              </div>
              <Image src="/cardHeader.png" alt="bangboo" width={30} height={30}/>
            </div>
            {props.extracomponents && (
              <div className="flex flex-row gap-2 w-full md:w-1/3 justify-end">
                  {props.extracomponents}
              </div>
            )}
        </div>	
    </>
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
