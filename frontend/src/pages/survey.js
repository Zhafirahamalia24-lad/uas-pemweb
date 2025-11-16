import { useState } from 'react'
import axios from 'axios'
export default function Survey(){
  const [form, setForm] = useState({user_id:'user1', duration_minutes:60, breaks:1, focus_score:0.7, sleep_hours:7, mood:4})
  const [result, setResult] = useState(null)
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      const res = await axios.post('http://localhost:8000/predict', form)
      setResult(res.data)
    }catch(err){
      alert('Error calling API')
    }
  }
  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Kuesioner Sesi Kerja</h2>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <div>
          <label>Duration (minutes)</label>
          <input type="number" value={form.duration_minutes} onChange={e=>setForm({...form,duration_minutes:parseInt(e.target.value)})} />
        </div>
        <div>
          <label>Breaks</label>
          <input type="number" value={form.breaks} onChange={e=>setForm({...form,breaks:parseInt(e.target.value)})} />
        </div>
        <div>
          <label>Focus score (0-1)</label>
          <input type="number" step="0.01" value={form.focus_score} onChange={e=>setForm({...form,focus_score:parseFloat(e.target.value)})} />
        </div>
        <div>
          <label>Sleep hours</label>
          <input type="number" step="0.1" value={form.sleep_hours} onChange={e=>setForm({...form,sleep_hours:parseFloat(e.target.value)})} />
        </div>
        <div>
          <label>Mood (1-5)</label>
          <input type="number" value={form.mood} onChange={e=>setForm({...form,mood:parseInt(e.target.value)})} />
        </div>
        <button className="px-3 py-2 bg-green-600 text-white rounded" type="submit">Submit & Predict</button>
      </form>
      {result && (
        <div className="mt-4 p-3 border">
          <h3>Result: {result.label}</h3>
          <p>Probability: {result.probability}</p>
        </div>
      )}
    </div>
  )
}
