import React, { useState } from "react"
import { View, TextInput, Text, TouchableOpacity } from "react-native"
import ResultIMC from "./resultadoImc"
import styles from "./style"

export default function Form() {

    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageImc, setMessageImc] = useState('Preencha o peso e a altura')
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState('Calcular')

    function imcCalculator() {
        return setImc((weight / (height * height)).toFixed(2))
    }

    function validationImc() {
        if (weight != null && height != null) {
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setMessageImc('Seu IMC e igual:')
            setTextButton('Calcular novamente')
            return
        }
        setImc(null)
        setTextButton('Calcular')
        setMessageImc('Preencha o peso e a altura')
    }

    return(
        <View style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <TextInput
                    onChangeText={setHeight}
                    value={height}
                    placeholder="Ex. 1.75"
                    keyboardType="numeric"
                    style={styles.formInput}
                />
                <Text style={styles.formLabel}>Peso</Text>
                <TextInput
                    onChangeText={setWeight}
                    value={weight}
                    placeholder="Ex. 70.2"
                    keyboardType="numeric"
                    style={styles.formInput}
                />
                <TouchableOpacity
                    onPress={() => validationImc()}
                    style={styles.formButton}
                >
                    <Text style={styles.textFormButton}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            <ResultIMC
                messageResultImc={messageImc}
                resultImc={imc}
            />
        </View>
    );
}