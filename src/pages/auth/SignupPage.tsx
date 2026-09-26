import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerInstructor } from '../../redux/slices/authSlice';

const SignupPage = () => {
  const instructorInfo = {
    name: "",
    email: "",
    password: "",
    bio: "",
    avatar: null,
    profession: "",
    category: "",
    company: "",
    experience: 0,
    skills: "",
  }

  const [info, setInfo] = useState(instructorInfo);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if(info.experience > 25) {
      throw new Error("Experience can't be that much");
      setLoading(false);
    }

    try {
      const result = await dispatch(
        registerInstructor({
          ...info,
          experience: Number(info.experience),
          skills: info.skills
            .trim()
            .split(/\s+/)
            .filter(Boolean),
        })
      ).unwrap();

      if(result) {
        navigate("/home");
      }

    } catch(error) {
      console.log("Failed to registers instructor:", error);
    } finally {
      setLoading(false);
      setInfo(instructorInfo)
    }

  }

  return (
    <div className='min-h-screen max-w-full flex items-center justify-center px-6'>
        <div className='card w-full max-w-3xl p-8 bg-white text-black'>
          <h1 className='text-2xl font-semibold font-display mb-1'>Create your account</h1>

          <p className='text-gray-400 text-sm mb-6'>
            Start your instructor journey.
          </p>

          <form onSubmit={handleSubmit} >
            <div className='space-x-6 flex mb-4'>
              <div className='space-y-4'>
                <div>
                  <label className='text-sm block mb-1' >Name</label>
                  <input name="name"
                    required 
                    value={info.name} 
                    onChange={(e) => 
                      setInfo({...info, name: e.target.value})
                    }
                    placeholder="Full Name"
                    className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-stud"
                    type="text" />
                </div>

                <div>
                  <label className='text-sm block mb-1' >Email</label>
                  <input name="email"
                    required
                    value={info.email}
                    onChange={(e) => 
                      setInfo({...info, email: e.target.value})}

                    placeholder="your@example.com"
                    className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-stud"
                    type="email" />
                </div>

                <div>
                  <label className='text-sm block mb-1' >Password</label>
                  <input name="password" 
                    required
                    value={info.password}
                    onChange={(e) => 
                      setInfo({...info, password: e.target.value})
                    }
                    className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-stud"
                    placeholder="••••••••"
                    type="password" />
                </div>

                <div>
                  <label className='text-sm mb-1'>Avatar</label>
                  <input name="avatar"
                    required
                    onChange={(e) => 
                      setInfo({ ...info, avatar: e.target.files[0]})
                    }
                    className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-stud"
                    type="file" />
                </div>

                <div>
                  <label className='text-sm block mb-1'>Bio</label>
                  <textarea rows={5} cols={10}
                    name="bio"
                    required
                    value={info.bio}
                    onChange={(e) => 
                      setInfo({...info, bio: e.target.value})
                    }
                    className="w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-stud"
                    placeholder="Tell something about you" />
                </div>
              </div>

              <div className='space-y-4'>
                <div>
                  <label className='text-sm block mb-1'>Profession</label>
                  <input type="text"
                    className='w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-stud'
                    required
                    value={info.profession}
                    onChange={(e) => 
                      setInfo({...info, profession: e.target.value})
                    }
                    placeholder="Tell about Profession" />
                </div>

                <div> 
                  <label className='text-sm block mb-1'>Category</label>
                  <input type="text"
                    className='w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-stud'
                    required
                    value={info.category}
                    onChange={(e) => 
                      setInfo({...info, category: e.target.value})
                    }
                    placeholder="Tell about Category" />
                </div>

                <div> 
                  <label className='text-sm block mb-1'>Company</label>
                  <input type="text"
                    className='w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-stud'
                    required
                    value={info.company}
                    onChange={(e) => 
                      setInfo({...info, company: e.target.value})
                    }
                    placeholder="Tell about Company" />
                </div>

                <div> 
                  <label className='text-sm block mb-1'>Experience</label>
                  <input 
                    type="number"
                    className='w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-stud'
                    required
                    value={info.experience}
                    onChange={(e) => 
                      setInfo({...info, experience: e.target.value})
                    }
                    />
                </div>
                <div> 
                  <label className='text-sm block mb-1'>Skills</label>
                  <input 
                    type="text"
                    className='w-full border border-line px-3 py-2 text-sm focus:outline-none focus:border-stud'
                    required
                    value={info.skills}
                    onChange={(e) => 
                      setInfo({...info, skills: e.target.value})
                    }
                    placeholder="Tell about Skills" />
                </div>
              </div>

            </div>

            <div>
              <button 
              disabled={loading} 
              type='submit' className='bg-green-700 text-white px-3 py-2 mx-auto'>
                {loading ? "Registering..." : "Register"}
              </button>
            </div>

            <div>
              <p className="text-sm text-inkfaint mt-5">
                Already have an account?{" "}
                <Link to="/login" className="text-stud underline">Log in</Link>
              </p>
            </div>
          
           </form>
        </div>
    </div>
  )
}

export default SignupPage
