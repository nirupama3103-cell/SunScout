<div className="category-pill-nav">
  {["Indoor Activities", "Weekend Activities", "Summer Free Fun", "Paid Activities"].map(cat => (
    <button 
      key={cat} 
      className={`category-button ${activeCategory === cat.toLowerCase() ? 'active-pill' : ''}`}
      onClick={() => setActiveCategory(cat.toLowerCase())}
    >
      ● {cat}
    </button>
  ))}
  <div className="paid-note-pill">
    If you don't have a free summer, don't worry; we've got you covered with some fun paid activities that should look the same as the above image.
  </div>
</div>
export default App;
