export default function Card({ data }){
  return(
    <div className="flex">
      {data.results.map((itens) => (
        <div key={itens.id}>
          <img src={`https://image.tmdb.org/t/p/w500${itens.poster_path}`} alt={itens.title} />
        </div>
      ))}
    </div>
  )
}