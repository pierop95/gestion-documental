from flask import Flask, request, send_file
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
import io

app = Flask(__name__)

def wrap_text(text, max_width, c, font_name="Helvetica", font_size=12):
    words = text.split()
    lines = []
    current_line = ""

    for word in words:
        test_line = f"{current_line} {word}".strip()
        if c.stringWidth(test_line, font_name, font_size) <= max_width:
            current_line = test_line
        else:
            lines.append(current_line)
            current_line = word

    if current_line:
        lines.append(current_line)
    
    return lines

@app.route('/create_pdf', methods=['POST'])
def generar_pdf():
    data = request.json
    content = data.get('content', '')

    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=LETTER)
    width, height = LETTER
    margen = inch
    max_width = width - 2 * margen
    y_position = height - margen

    c.setFont("Helvetica", 12)

    # Envolver texto y dibujarlo línea por línea
    lineas = wrap_text(f"Contenido enviado en la peticion: {content}", max_width, c)
    for linea in lineas:
        if y_position < margen:  # salto de página
            c.showPage()
            c.setFont("Helvetica", 12)
            y_position = height - margen
        c.drawString(margen, y_position, linea)
        y_position -= 14  # espacio entre líneas

    c.save()
    buffer.seek(0)

    return send_file(buffer, as_attachment=True, download_name="documento.pdf", mimetype='application/pdf')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000,debug=True)
