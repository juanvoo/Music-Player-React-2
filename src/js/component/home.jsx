import React, { useState, useEffect, useRef } from "react";

//create your first component
const Home = () => {
	
	const [lista, setLista] = useState([]);
	const [onPlay, setOnPlay] = useState(null);
	const API = "https://assets.breatheco.de/apis/sound/"
	const audios = useRef();


	function getCanciones() { 
		fetch(API.concat("songs"))
			.then((response) => {
				console.log(response.statusText)
				return response.json()
			})
			.then((data) => setLista(data))
			.catch((error) => console.log(error))
	}

	useEffect(() => {
		getCanciones()
	}, [])

	function next(){
		setOnPlay(onPlay +1) 
		audios.current.src = API.concat(lista[onPlay].url)
		audios.current.play()
	}

	function previous(){
		setOnPlay(onPlay -1);
		audios.current.src = API.concat(lista[onPlay].url)
		audios.current.play()
	}

	function pauseAudio(url){
		if(audios.current.play){
			audios.current.src = API.concat(url)
			audios.current.pause()
		} else {
			audios.current.play()
		}	 
	}

	function playStop(url){
		if(audios.current.pause){
			audios.current.src = API.concat(url)
			audios.current.play()
		} else {
			audios.current.pause()
		}	 
	}

	return (
		
		<div className="col-mt-4 bg-black display-4 text-center text-danger">
			<div>
				<p>Playlist</p>
		 </div>
		 <div className="row">
	            <ol>
				     {lista.map((item) => 
					    <button key={item.id}
					            className="btn btn-lg w-75 text-light column-mb-3" 
					            onClick={() => playStop(item.url, item.id)}
					            value={item}>
						        {item.id} - {item.name}
					</button>)}
		       </ol>
		 </div>

			       <audio ref={audios} controls>
					        <source src={audios} type="audio/mp3" />
			      </audio>

			<div className="container-footer bg-black">
				<button onClick={() => previous({onPlay})}
					className="btn btn-outline-light">
					<i class="fa fa-backward"></i>
				</button>
				
				<button className="btn btn-outline-light"
					onClick={() => pauseAudio({onPlay})}>
					<i className="fa fa-pause" />
				</button>
				
				<button className="btn btn-outline-light"
					onClick={() => playStop({onPlay})}>
					<i className="fa fa-play" />
				</button>

				<button onClick={() => next({onPlay})}
					className="btn btn-outline-light">
					<i class="fa fa-forward"></i>
				</button>
					
			</div>
		</div>
	);
};

export default Home;
