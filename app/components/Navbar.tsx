import { auth, signOut, signIn } from '@/auth';
import Image from 'next/image'
import Link from 'next/link'

const Navbar = async () => {
    const session = await auth();

  return (
    <header className="w-full bg-white shadow px-5 py-5 font-work-sans ">
        <nav className=" flex justify-between items-center">
            <Link href={"/"}>
                <Image src={"/logo.png"} alt="Logo" width={240} height={40} />
            </Link>

            <div className='flex gap-6 items-center'>
                {session && session?.user ? 
                    <>
                        <Link href={"/startup/create"} className='text-gray-600 font-medium hover:text-gray-900'>
                            Create
                        </Link>
                        <form action={async() => {
                            "use server";
                            await signOut()}
                            } className='text-gray-600 font-medium hover:text-gray-900'>
                            <button type='submit'>Sign Out</button>
                        </form>
                        <Link className='text-gray-600 font-medium hover:text-gray-900 flex items-center justify-between gap-5 bg-green-300 rounded-2xl p-2' href={`/user/${session?.user?.id}`}>
                        <span>{session?.user?.name}</span>
                        <Image className='rounded-full' src={session?.user?.image || ""} alt='Profile Pic' width={35} height={35} />
                        </Link>
                    </>
                    :
                    <>
                    <form  action={async() =>
                        {"use server";
                         await signIn("github")}
                         } className='text-gray-600 font-medium hover:text-gray-900'>
                        <button type='submit'>Sign In</button>  
                    </form>
                    </>}
            </div>

        </nav>

    </header>
  )
}

export default Navbar
