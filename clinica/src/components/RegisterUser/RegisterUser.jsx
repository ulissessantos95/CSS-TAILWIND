import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const RegisterUser = () => {
    //campos do formulário
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    // verificador de correspondência de senha
    const [isPasswordMatch, setIsPasswordMatch] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    //funções de alteração de estado
    const handleEmailChange = (e) => setEmail(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value)

    //validação dos campos de senha
    const isPasswordValid = () => password.length >= 8 && password === confirmPassword

    //função para limpar o formulário

    const resetForm = () => {
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setIsPasswordMatch(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isPasswordValid()) {
            setIsPasswordMatch(false)
            return
        }

        setIsSaving(true)

        try {
            await axios.post('http://localhost:3000/users', { email, password })
            setIsSaving(false)
            resetForm()
            toast.success("Usuário criado com sucesso!", {
                autoClose: 3000,
                hideProgressBar: true
            })

        } catch (error) {
            console.error("Erro ao criar o usuário", error)
            toast.error('Erro ao criar o usuário!', {
                autoClose: 3000,
                hideProgressBar: true
            })
            setIsSaving(false)
        }
    }



    return (
        <div className='w-full max-w-md p-6 bg-white rounded-xl shadow-lg'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Criar Usuário</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label htmlFor='emailRegisterUser' className='block text-sm font-medium mb-1'>Email</label>
                    <input
                        type='email'
                        id='emailRegisterUser'
                        value={email}
                        onChange={handleEmailChange}
                        required
                        className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div>
                    <label htmlFor='passwordRegisterUser' className='block text-sm font-medium mb-1'>Senha</label>
                    <input
                        type='password'
                        id='passwordRegisterUser'
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        minLength={8}
                        className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div>
                    <label htmlFor='confirmPassword' className='block text-sm font-medium mb-1'>Confirmar senha</label>
                    <input
                        type='password'
                        id='confirmPassword'
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                        minLength={8}
                        className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    {!isPasswordMatch && (
                        <p className='text-red-500 text-sm mt-1'>As senhas não correspondem</p>
                    )}
                </div>

                <div className='flex justify-center'>
                    <button
                        type='submit'
                        disabled={isSaving}
                        className={`w-full p-2 rounded-lg text-white ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition-colors cursor-pointer`}
                    >
                        {isSaving ? 'Salvando' : 'Criar Usuário'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default RegisterUser