
import PageHeader from './layouts/PageHeder'
import CategoryPills from './components/Category'
import { categories } from './data/categories'
import { useState } from 'react'


function App() {
const [selectedCategory, setSelectedCategory] = useState(categories[0])
  return (
    <>
      <div className="max-h-screen flex flex-col">
        <PageHeader />
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <div>sidebar</div>
          <div className="sticky top-0 bg-white z-10 pb-4">
            <CategoryPills 
            categories={categories}
            selectedCategory={selectedCategory} 
            onSelect={setSelectedCategory}
            />
          </div>
        </div>

       </div>
    </>
  )
}

export default App
