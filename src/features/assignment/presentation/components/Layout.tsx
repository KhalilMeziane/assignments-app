import React from "react"

export default function Layout({
  children,
}: {
  children: React.ReactElement[]
}) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto w-10/12 md:9/12 lg:8/12 xl:w-6/12">
        {children}
      </div>
    </div>
  )
}
