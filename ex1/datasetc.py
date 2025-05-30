def converter_numeros(dataset):
    for edicao in dataset:
        # Converte 'anoEdicao' de string para inteiro, se existir e for string
        if "anoEdicao" in edicao and isinstance(edicao["anoEdicao"], str):
            try:
                edicao["anoEdicao"] = int(edicao["anoEdicao"])
            except ValueError:
                pass  # se não for convertível, mantém como está
    return dataset

# Exemplo de uso:
if __name__ == "__main__":
    import json

    with open("eurovision.json", "r", encoding="utf-8") as f:
        dados = json.load(f)

    dados = converter_numeros(dados)

    with open("db.json", "w", encoding="utf-8") as f:
        json.dump(dados, f, indent=2, ensure_ascii=False)
