from langchain_community.document_loaders import PyPDFLoader
import tempfile
import os

def process_pdf(file_bytes: bytes) -> str:
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(file_bytes)
        tmp_path = tmp.name

    loader = PyPDFLoader(tmp_path)
    pages = loader.load()
    os.unlink(tmp_path)

    full_text = "\n".join([page.page_content for page in pages])
    return full_text