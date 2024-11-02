import { Button } from "@/components/ui/button"
import { createAdminClient } from "@/lib/apprwrite"

export default function Home() {
  console.log(createAdminClient)

  return (
    <div className="">
      <Button size={"xs"}>Primary</Button>
      <Button variant={"secondary"}>Secondary</Button>
      <Button variant={"destructive"}>Destructive</Button>
      <Button variant={"ghost"}>Ghost</Button>
      <Button variant={"muted"}>Muted</Button>
      <Button variant={"outline"}>Outline</Button>
      <Button variant={"teritary"}>Teritary</Button>
    </div>
  )
}
