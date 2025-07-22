

export default function fetchModalidad(){
      return fetch("http://localhost:5000/modalidad")
      .then(res => res.json())
      .then(data => 

       {return data}

      );
        

}