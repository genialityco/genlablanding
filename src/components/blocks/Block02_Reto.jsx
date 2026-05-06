import React from "react";
import { Section } from "../layout/Section";
import { AttentionChallenge } from "../interactions/AttentionChallenge";

export function Block02_Reto() {
  return (
    <Section id="reto" number="02" title="EL RETO">
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4rem", alignItems: "center" }}>
        <div style={{ flex: "1 1 400px" }}>
          <h2 className="text-h2" style={{ marginBottom: "1.5rem" }}>
            La atención es el recurso más escaso en cualquier espacio.
          </h2>
          <p className="text-body-lg text-secondary" style={{ marginBottom: "1rem" }}>
            Todo compite por segundos. Pantallas, estímulos, ruido constante. La comunicación estática no alcanza: lo
            pasivo se ignora, el material POP se olvida y los formularios se evitan.
          </p>
          <p className="text-body-lg text-secondary">
            Gen.Lab parte de una idea simple: la atención no se pide, se gana. Las personas dejan de mirar y empiezan a
            participar. Y en ese momento, todo cambia.
          </p>
        </div>
        <div style={{ flex: "1 1 500px" }}>
          <AttentionChallenge />
        </div>
      </div>
    </Section>
  );
}
