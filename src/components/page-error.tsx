import { AlertTriangle } from "lucide-react"

interface PageErrorProps {
    message: string;
  }
export const PageError = ({message}: PageErrorProps) => {
    return (
        <div className="flex h-full flex-col items-center justify-center">
        <AlertTriangle className="size-6 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    )
}