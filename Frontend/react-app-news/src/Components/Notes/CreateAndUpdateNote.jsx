import React from 'react'

const CreateAndUpdateNote = () => {
  return (
    <div className='relative m-auto pl-12 grid grid-cols-1 md:grid-cols-2 gap-5 '>
      <div className='flex flex-col justify-evenly m-auto'>
        {/*first */}
        <div className="text-left mb-8 mt-8 ">
          <h1 className="text-5xl font-extrabold text-gray-900 font-[Supreme] leading-tight">
            Add Articles
          </h1>
          <p className=" text-black mt-3 font-[Supreme]">
            Create and Update your articles here to note informative current affairs
          </p>
        </div>
         {/*Second */}
        <div>
          <div>
            <label htmlFor="" className=' text-xl font-[Supreme] font-semibold'>Title</label>
            <br />
            <div className='flex flex-row gap-6'>
            <input type="text" placeholder='Enter your title here' className='border font-[Supreme] border-solid border-neutral-500 rounded-lg p-2 mt-3 w-4/6' />
            <button className='px-12 text-lg mt-3 rounded-lg font-[Supreme] bg-black text-[#F7374F] hover:text-white group'>
                    Create Article
                  
                </button>
                </div>
          </div>
          <div className='mt-6'>
            <label htmlFor="" className=' text-xl font-[Supreme] font-semibold'>Description</label>
            <br />
            <textarea className='border border-solid border-neutral-500 rounded-lg mt-3 min-w-[500px] font-[Supreme] p-4' placeholder='Enter content here' rows={14} cols={82}></textarea>
          </div>
        </div>
      </div>

      <div className='bg-black relative flex flex-col items-start'>
          <div>
            <h1 className='text-white font-[Supreme]  text-xl px-10 py-10'>Watch Your Articles</h1>
          </div>

          <div className='flex flex-col justify-center items-start mx-auto'>
          <div className="px-8 py-8 border border-solid border-neutral-200 rounded-lg">
                <h3 className="font-semibold  font-[Supreme] mb-2 text-white">Sample News Headline </h3>
                <p className="text-sm  font-[Supreme] text-muted-foreground text-white">
                  This is a sample news article preview. Click to read more about this interesting topic.
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs  font-[Supreme] text-muted-foreground text-white">March 30, 2025</span>
                  <span className="text-xs  font-[Supreme] font-medium text-white">5 min read</span>
                </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default CreateAndUpdateNote

