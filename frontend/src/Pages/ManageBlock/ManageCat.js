import React from 'react'
import ManageCategory from './ManageCategory'
import ManageSubcategory from './ManageSubcategory'
import ManageSubClassification from './ManageSubClassification'

function ManageCat() {
  return (
    <div className='flex justify-evenly bg-slate-50'>
        <ManageCategory/>
        <ManageSubcategory/>
        <ManageSubClassification/>
    </div>
  )
}

export default ManageCat