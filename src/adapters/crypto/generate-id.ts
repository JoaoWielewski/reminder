import { randomUUID } from 'crypto'
import { GenerateIdPort } from '../../ports/crypto/generate-id'
export class GenerateIdAdapter implements GenerateIdPort {
  generate(): string {
    return randomUUID()
  }
}
