import './App.css';

function App() {
  return (
    <div className="App" >
      {/* <label className="bg-white">Hi</label> */}
      <div className="w-full max-w-xs">
        <form className="form" className="shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-yellow-50 opacity-100">
          <div className="inner">
              <label className="block text-gray-700 text-sm font-bold mb-2">Enter Source</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Enter Destination</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
          </div>
          <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Select Time</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="time" />
          </div>
        </form>
      </div>
      <div>
        <h4>Welcome to RailSave!</h4>
        <b>Here is our humble attempt to help you with optimizing your travel time over the Local</b>
      </div>
    </div>
  );
}

export default App;
