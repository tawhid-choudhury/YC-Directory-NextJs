import React from 'react'

const SearchForm = () => {
  return (
    <div>
        <form action="/" className='w-full flex items-center justify-between gap-3 '>
            <input 
            type="text"
            name='query'
            defaultValue="" 
            placeholder='Search by name, domain, location, market...' 
            className='search_input' />
            <button type='submit' className='search_button'></button>
        </form>
    </div>
  )
}

export default SearchForm
