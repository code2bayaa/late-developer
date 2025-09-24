import FOX from "./Fox"
import swal from "sweetalert";
import { useEffect, useRef, useState } from "react";

const CONTACT = () => {
    const formRef = useRef();
    const [form, setForm] = useState({name: "", email: "", message: "", subject : ""});
    const [loading, setLoading] = useState(false);
    const [currentAnimation, setCurrentAnimation] = useState("idle");
    const [windowWidth, setWindowWidth] = useState(null);

    useEffect(() => {
        // Set initial window width
        setWindowWidth(window.screen.width);
    }, []);

    const handleChange = ({target:{ name, value }}) => {
      setForm({ ...form, [name]: value });
    };
  
    const handleFocus = () => setCurrentAnimation("walk");
    const handleBlur = () => setCurrentAnimation("idle");

    const handleSubmit = (e) => {

        e.preventDefault();
        setLoading(true);
        setCurrentAnimation("hit");
    
        let body = { name: form.name, email : form.email, subject : form.subject, message : form.message }

        fetch("/api/Email",{
                method : "POST",
                headers : {'Content-type': 'application/json; charset=UTF-8'},
                body : JSON.stringify(body)
            })
        .then(res => res.json())
        .then(({ status, error }) => {
            
            console.log(status)
            if(status){
                setLoading(false);
                swal("Success", "Thank you for your message 😃", "success");
                setTimeout(() => {
                    setCurrentAnimation("idle");
                    setForm({
                        name: "",
                        email: "",
                        subject : "",
                        message: "",
                    });
                }, [3000]);
            }


            if(error || !status){
                setLoading(false);
                console.error(error);
                setCurrentAnimation("idle");
                swal("Error", "I didn't receive your message 😢", "error");
            }
        })
        .catch((error) => {
            console.error(error);
            setLoading(false);
            setCurrentAnimation("idle");
            swal("Error", "I didn't receive your message 😢", "error");
        })

    }
    
    return (
        <div id="contact" className="w-[100%] flex flex-wrap lg:h-[100%] md:h-auto sm:h-auto py-20 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 relative">
            <div className="w-[100%] text-center text-[30px]">
                <h1><span className="gradient-text ">Get in</span> Touch</h1>
            </div>
            <div className="lg:w-[40%] sm:w-[100%] h-[100%] left-0 top-0 flex flex-col justify-center items-center p-10">
                <form
                    ref={formRef}
                    onSubmit={(e) => handleSubmit(e)}
                    className='w-full flex flex-col gap-7 justify-center items-center'
                >
                    <div className="border-b-2 border-black/20 w-[80%]">
                        <label className='text-black-500 font-semibold'>
                            Name
                        </label>
                        <input
                            type='text'
                            name='name'
                            className='w-[100%] h-[40px]'
                            placeholder='Name'
                            required
                            value={form.name}
                            onChange={(e) => handleChange(e)}
                            onFocus={(e) => handleFocus(e)}
                            onBlur={(e) => handleBlur(e)}
                        />
                    </div>
                    <div className="border-b-2 border-black/20 w-[80%]">
                        <label className='text-black-500 font-semibold'>
                            Email
                        </label>
                        <input
                            type='email'
                            name='email'
                            className='w-[100%] h-[40px]'
                            placeholder='BrianWekesa@hotmail.com'
                            required
                            value={form.email}
                            onChange={(e) => handleChange(e)}
                            onFocus={(e) => handleFocus(e)}
                            onBlur={(e) => handleBlur(e)}
                        />
                    </div>
                    <div className="border-b-2 border-black/20 w-[80%]">
                        <label className='text-black-500 font-semibold'>
                            Subject
                        </label>
                        <input
                            name='subject'
                            className='w-[100%] h-[40px]'
                            placeholder='subject'
                            value={form.subject}
                            onChange={(e) => handleChange(e)}
                            onFocus={(e) => handleFocus(e)}
                            onBlur={(e) => handleBlur(e)}
                        />
                    </div>
                    <div className="border-b-2 border-black/20 w-[80%]">
                        <label className='text-black-500 font-semibold'>
                            Your Message
                        </label>
                        <textarea
                            name='message'
                            rows='4'
                            className='w-[100%] min-h-[100px]'
                            placeholder='Write here...'
                            value={form.message}
                            onChange={(e) => handleChange(e)}
                            onFocus={(e) => handleFocus(e)}
                            onBlur={(e) => handleBlur(e)}
                        />
                    </div>
                    <button
                        type='submit'
                        disabled={loading}
                        className='w-[80%] bg-stone-900 cursor-pointer text-white font-bold py-3 px-6 rounded-md hover:glow-primary transition-all duration-300 disabled:opacity-50'
                        onFocus={(e) => handleFocus(e)}
                        onBlur={(e) => handleBlur(e)}
                    >
                        {loading ? "Sending..." : "Submit"}
                    </button>
                </form>
            </div>
            {
                windowWidth > 800 && (
                    <div className="lg:w-[60%] sm:w-[100%] md:w-[80%]">
                        <FOX currentAnimation={currentAnimation}/>
                    </div>
                )
            }

            
        </div>
    )
}

export default CONTACT

//email
//fox 3D