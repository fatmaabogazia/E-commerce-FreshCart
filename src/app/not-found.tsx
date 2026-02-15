import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <div className='container md:w-[90%] lg:w-[70%] xl:w-[50%] my-7 mx-auto flex '>
        <div className='flex items-center px-3 text-3xl text-emerald-600'> <i className="fa-regular fa-circle-question"></i> </div>
        <div>
          <h2 className='text-lg/7 lg:text-xl/7 text-emerald-500 font-semibold lg:font-bold '>
            Looking for something?
          </h2>
          <p className='text-lg/relaxed'>We&apos;re sorry. The Web address you&apos;ve entered is not a functioning page on our site. </p>

          <Link href={"/"}> <i className="fa-solid fa-caret-right pr-1 text-md text-emerald-600"></i> <span className='text-lg lg:text-xl text-emerald-600 underline font-semibold lg:font-bold'> Click here to go back to FreshCart home page </span></Link>
        </div>
      </div>

    </>
  )
}
