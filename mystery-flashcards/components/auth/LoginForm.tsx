"use client"
import { useForm} from 'react-hook-form';
import MyInput from '../common/form/MyInput';

export default function LoginForm({dictionary}:{dictionary:any}){
    const {
        register,
        handleSubmit,
        watch,
        getFieldState,
        formState
      } = useForm<LoginForm>({mode: 'onBlur'});
    
      const onSubmit = (data: LoginForm, e:any) => {
        e.preventDefault()
        console.log("subm")
        console.log(data)
      };
      const onErrors = (errors:any) => console.error(errors);
      const isValid = (name:string)=>{
        console.log(getFieldState("name", formState));
      const {errors} = formState;
      console.log(formState.errors.root)
      console.log(formState.errors)
      console.log(errors)
         return !Object.keys(errors).includes(name);;};
    //  const errorClass = () => isValid ? "" : "input-error";
    
      return (
        <form onSubmit={handleSubmit(onSubmit, onErrors)}>
          <div className='px-24'>
      
            <MyInput
              label="Login"
              placeholder="Podaj login"
              inputParams={{...register("name", { required: true })}}
              isValid={isValid("name")} />
            <MyInput
              label="Hasło"
              placeholder="Podaj hasło"
              type="password"
              inputParams={{...register("password", { required: true })}}
              isValid={isValid("password")} />
    
            <div className='grid justify-center mt-6'>
              <button type="submit" className="btn btn-primary mb-3 btn-wide">Zaloguj</button>
              <button className="btn btn-secondary btn-outline  mb-3 btn-wide">Zarejestruj</button>
            </div >
          </div>
        </form>
      )
}