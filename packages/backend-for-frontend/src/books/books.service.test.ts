import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { BooksService } from './books.service'

describe('BooksService', () => {
  let service: BooksService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, BooksService],
    }).compile()

    service = module.get<BooksService>(BooksService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
