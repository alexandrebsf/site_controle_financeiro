"use client"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Sheet, SheetTrigger, SheetContent} from "@/components/ui/sheet"
import {Button} from "../button"
import Link from 'next/link'
import {  PanelBottomIcon , Package , Home , GitGraphIcon, BanknoteArrowDown, HandCoins} from "lucide-react"
import { TooltipProvider ,Tooltip, TooltipTrigger, TooltipContent} from "@/components/ui/tooltip"
export function SideBar(){
    return(
        <div className = "flex w-full flex-col bg-muted/40">
            {/* Sidebar exclusiva para desktop*/}
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 justify-center border-r bg-background sm:flex">

                <nav className ="flex flex-col items-center gap-4 px-2 py-5">
                    <TooltipProvider>
                        <Link href="#" 
                                    className="flex 
                                                h-10
                                                w-10
                                                bg-primary
                                                rounded-full
                                                text-lg
                                                items-center
                                                justify-center
                                                text-primary-foreground
                                                md:text-base
                                                gap-2">
                                    <Package className="h-5 w-5"></Package>{/* Ícone do botão - Biblioteca Lucide-react*/}
                                    <span className="sr-only">logo1</span>
                        </Link>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/" 
                                    className="flex
                                                items-center
                                                h-9
                                                w-9
                                                shrink-0
                                                rounded-lg
                                                justify-center
                                                md:text-base
                                                gap-4
                                                px-2.5
                                                transition-colors
                                                text-muted-foreground
                                                hover:text-foreground">
                                    <Home className="h-5 w-5"></Home>{/* Ícone do botão - Biblioteca Lucide-react*/}
                                    <span className="sr-only">Inicio</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="text-1xl">
                                Início
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/dashboard" 
                                    className="flex
                                                items-center
                                                h-9
                                                w-9
                                                shrink-0
                                                rounded-lg
                                                justify-center
                                                md:text-base
                                                gap-4
                                                px-2.5
                                                transition-colors
                                                text-muted-foreground
                                                hover:text-foreground">
                                    <GitGraphIcon className="h-5 w-5"/>{/* Ícone do botão - Biblioteca Lucide-react*/}
                                    <span className="sr-only">Dashboard</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="text-1xl">
                                Dashboard
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/gastos" 
                                    className="flex
                                                items-center
                                                h-9
                                                w-9
                                                shrink-0
                                                rounded-lg
                                                justify-center
                                                md:text-base
                                                gap-4
                                                px-2.5
                                                transition-colors
                                                text-muted-foreground
                                                hover:text-foreground">
                                    <BanknoteArrowDown className="h-5 w-5"/>{/* Ícone do botão - Biblioteca Lucide-react*/}
                                    <span className="sr-only">Gastos</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="text-1xl">
                                Gastos
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/metas" 
                                    className="flex
                                                items-center
                                                h-9
                                                w-9
                                                shrink-0
                                                rounded-lg
                                                justify-center
                                                md:text-base
                                                gap-4
                                                px-2.5
                                                transition-colors
                                                text-muted-foreground
                                                hover:text-foreground">
                                    <HandCoins className="h-5 w-5"/>{/* Ícone do botão - Biblioteca Lucide-react*/}
                                    <span className="sr-only">Metas</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="text-1xl">
                                Metas
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
                    
                    
            </aside>
            {/* Sidebar exclusiva para mobile*/}
            <div id="mobile" className = "sm:hidden flex  flex-col sm: gap-4 sm:py-4 sm:pl-14">
                {/* Header fixo no topo da tela */}
                <header className= "sticky top-0 z-30 flex h-14 items-center px-4 border-b bg-background gap-4 sm:static sm:h-auto sm:bg-transparent sm:px-4 ">
                    <Sheet> {/* Componente Sheet controla abertura e fechamento do menu */}
                        <SheetTrigger asChild>{/* Botão que dispara a abertura do menu */}
                            <Button size="icon" variant = "outline" className="sm:hidden">
                                <span className="sr-only"> Abrir </span>{/* Texto acessível para leitores de tela */}
                                <PanelBottomIcon className="w-5 h-5"/>{/* Ícone do botão - Biblioteca Lucide-react*/}
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="left" className="sm:max-w-x">{/* Conteúdo lateral do menu (drawer) */}
                            <nav className="grid gap-6 text-lg font-medium ml-4 mt-4">{/* Navegação principal */}
                                <Link href="#" 
                                    className="flex 
                                                h-10
                                                w-10
                                                bg-primary
                                                rounded-full
                                                text-lg
                                                items-center
                                                justify-center
                                                text-primary-foreground
                                                md:text-base
                                                gap-2">
                                    <Package className="h-5 w-5"></Package>{/* Ícone do botão - Biblioteca Lucide-react*/}
                                    <span className="sr-only">logo1</span>
                                </Link>
                                <Link href="/" 
                                    className="flex
                                                items-center
                                                md:text-base
                                                gap-4
                                                px-2.5
                                                text-muted-foreground
                                                hover:text-foreground">
                                    <Home className="h-5 w-5"></Home>{/* Ícone do botão - Biblioteca Lucide-react*/}
                                    Inicio
                                </Link>
                                <Link href="/dashboard" 
                                    className="flex
                                                items-center
                                                md:text-base
                                                gap-4
                                                px-2.5
                                                text-muted-foreground
                                                hover:text-foreground">
                                    <GitGraphIcon className="h-5 w-5"></GitGraphIcon>{/* Ícone do botão - Biblioteca Lucide-react*/}
                                    Dashboard
                                </Link>
                                <Link href="/gastos" 
                                    className="flex
                                                items-center
                                                md:text-base
                                                gap-4
                                                px-2.5
                                                text-muted-foreground
                                                hover:text-foreground">
                                    <BanknoteArrowDown></BanknoteArrowDown>{/* Ícone do botão - Biblioteca Lucide-react*/}
                                    Gastos
                                </Link>

                                <Link href="/metas" 
                                    className="flex
                                                items-center
                                                md:text-base
                                                gap-4
                                                px-2.5
                                                text-muted-foreground
                                                hover:text-foreground">
                                    <HandCoins></HandCoins>{/* Ícone do botão - Biblioteca Lucide-react*/}
                                    Metas
                                </Link>
                                
                            </nav>
                        </SheetContent>

                    </Sheet>
                </header>
            </div> 
        </div>
    )
}