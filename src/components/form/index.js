import React, { useState } from "react"
import { View, TextInput, Text, TouchableOpacity, Vibration, Pressable, Keyboard, FlatList } from "react-native"
import ResultIMC from "./resultadoImc"
import styles from "./style"

export default function Form() {
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageImc, setMessageImc] = useState('Preencha o peso e a altura')
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState('Calcular')
    const [erroMessage, setErrorMessage] = useState(null)
    const [imcList, setImcList] = useState([])

    // formata a virgula da altura e calcula o IMC
    function imcCalculator() {
        let heightFormat = height.replace(",", ".")
        let totalImc = (weight / (heightFormat * heightFormat)).toFixed(2)
        setImcList((arr) => [...arr, {id: new Date().getTime(), imc: totalImc}])
        setImc(totalImc)
    }

    // verifica se a variavel imc esta vazia e faz o aparelho vibrar
    function verificationImc() {
        if (imc == null) {
            Vibration.vibrate()
            setErrorMessage("campo obrigatório*")
        }
    }

    function validationImc() {
        console.log(imcList)
        
        // se os campos altura e peso nao estiverem vazios
        if (weight != null && height != null) {
            // chama a função para calcular o IMC
            imcCalculator()
            // mensagem para o usuário
            setMessageImc('Seu IMC e igual:')
            setTextButton('Calcular novamente')
            // esvazia os campos e a msg de erro para o usuario fazer um novo calculo
            setHeight(null)
            setWeight(null)
            setErrorMessage(null)
        } else {
            verificationImc()
            setImc(null)
            setTextButton('Calcular')
            setMessageImc('Preencha o peso e a altura')
        }
    }

    return (
        <View style={styles.formContext}>
            { imc == null ?
                <Pressable onPress={Keyboard.dismiss} style={styles.form}>
                    <Text style={styles.formLabel}> Altura </Text>
                    <Text style={styles.errorMessage}> {erroMessage} </Text>
                    <TextInput
                        onChangeText={setHeight}
                        value={height}
                        placeholder="Ex. 1.75"
                        keyboardType="numeric"
                        style={styles.formInput}
                    />
                    <Text style={styles.formLabel}> Peso </Text>
                    <Text style={styles.errorMessage}> {erroMessage} </Text>
                    <TextInput
                        onChangeText={setWeight}
                        value={weight}
                        placeholder="Ex. 70.2"
                        keyboardType="numeric"
                        style={styles.formInput}
                    />
                    <TouchableOpacity onPress={() => validationImc()} style={styles.formButton}>
                        <Text style={styles.textFormButton}>{textButton}</Text>
                    </TouchableOpacity>
                </Pressable>
            : 
                <View style={styles.exibitionResultImc}>
                    <ResultIMC
                        messageResultImc={messageImc}
                        resultImc={imc}
                    />
                    <TouchableOpacity onPress={() => validationImc()} style={styles.formButton}>
                        <Text style={styles.textFormButton}> {textButton} </Text>
                    </TouchableOpacity>
                </View>
            }
            <FlatList
                style={styles.listImcs}
                data={imcList.reverse()}
                renderItem={({item}) => {
                    return (
                        <Text>Resultado IMC: {item.imc}</Text>
                    )
                }}
                keyExtractor={(item) => {
                    item.id
                }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}