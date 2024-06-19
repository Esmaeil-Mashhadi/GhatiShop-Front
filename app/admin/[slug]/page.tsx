'use client'

import AdminCategories from '@/components/modules/admin/Categories';
import AdminDashboard from '@/components/modules/admin/Dashboard';
import AdminProducts from '@/components/modules/admin/Product';

type AdminSlugType = 'products' | 'dashboard'| 'categories'
interface AdminPageProps  {
    params : {slug:AdminSlugType}
}

function page({params}:AdminPageProps) {

    const renderComponent = ()=>{
        
    switch (params.slug) {
        case 'products':
            return <AdminProducts  />
        case 'dashboard':
            return <AdminDashboard />
        case 'categories':
            return <AdminCategories />
        default:
            return <AdminDashboard />
    } 

}


  return (
    renderComponent()
  )
}

export default page