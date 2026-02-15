"use client"
// import MyBtn from "@/app/_components/myBtn/myBtn";
import React from "react";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

export default function About() {
  return (
    <>
      <div>About</div>
      {/* <MyBtn>Submit</MyBtn> */}

      <div className="container w-[50%] mx-auto">

        <Button variant="outline">Button</Button>
      </div>

      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
            position: "top-center"
          })
        }
      >
        Show Toast
      </Button>



    </>
  );
}
//   

// cookies ==> حجمها اقل من ال  وحمايه احسن طبعاا واقدر كمان اعمل له مده بعد اما تخلص لازم يسجل تاني زي local storage  expire local storage

// cookies ==> tow way ==> documment OR http ==> it is very save

// NEXTAuth==> دي المكتبه اللي هتخلينا نخزن التوكين في الكوكيز وهتخليه http only
